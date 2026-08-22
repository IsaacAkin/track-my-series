import { getTitle, addToCollection, updateTitleStatus, deleteTitle, updateTitleRating, updateTvWatchedCount, updateMovieWatchedCount } from "../../database.js";

const getTitleFromApi = async (id, mediaType, req, res) => {
    try {
        let response;
        mediaType == 'tv'
        ? response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, 
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`
                }
            })
        : response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, 
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`
                }
            });
            
        if (!response.ok) {
            return res.status(502).json({ message: 'Title retrieval service temporarily unavailable.' });
        }
        
        const data = await response.json();
        const title = {
            id: data.id,
            title: data.seasons ? data.name : data.title,
            original_title: data.seasons
                ? data.original_name
                : data.original_title,
            media_type: data.seasons ? 'tv' : 'movie',
            original_language: data.original_language,
            genres: data.genres.map(genre => genre.name),
            start_date: data.first_air_date || 'N/A',
            end_date: data.last_air_date || 'N/A',
            release_date: data.release_date || 'N/A',
            airing: mediaType == 'tv' && data.in_production,
            overview: data.overview,
            seasons: data.seasons?.filter(season => season.season_number != 0)
                .map(season => ({ season_number: season.season_number, episode_count: season.episode_count})) || 'N/A',
            poster_src: 'https://image.tmdb.org/t/p/w500/' + data.poster_path || 'N/A',
            rating: data.vote_average ?? 'N/A',
        };
        
        console.log(title);
        return title;
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

/** gets a single title from the specified collection via its ID and renders it */
const getTitleFromDatabase = async (id, req, res) => {
    try {
        const title = await getTitle(id);
    
        return title;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch title. '});
    }
}

/** fetches title information from the IMDB database if it doesn't already exist in the personal watchlist */
export const fetchTitle = async (req, res) => {
    try {
        const { id, mediaType } = req.params;
        let title;

        if (!id) {
            return res.status(400).json({ message: 'A title ID is required.' });
        }

        title = await getTitleFromDatabase(id, req, res);

        if (!title) {
            title = await getTitleFromApi(id, mediaType, req, res);
        }

        res.json({ title });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch title. '});
    }
}

export async function addTitleToDatabase(req, res) {
    try {
        const { id, mediaType } = req.params;
        const { title, original_title, start_date, end_date, release_date, original_language, genres, airing, overview, watchStatus, seasons, poster_src } = req.body;

        if (!id || !mediaType || !title) {
            return res.status(400).json({ message: 'ID, media type and title are required.' });
        }
    
        await addToCollection(id, title, original_title, mediaType, start_date, end_date, release_date, original_language, genres, airing, overview, watchStatus, seasons, poster_src);

        res.status(201).json({ message: `'${title}' has been added to the collection and set to '${watchStatus}'.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add title to the database.' });
    }
}

/** updates a titles status to the selected option passed in the req.body */
export const changeTitleStatus = async (req, res) => {
    try {
        const { id, mediaType } = req.params;
        const { newStatus } = req.body;
        
        await updateTitleStatus(id, mediaType, newStatus);

        res.status(200).json({ message: `Successfully updated title status to '${newStatus}'.` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update title status.' });
    }


}

/** updates a titles rating to the selected option passed in the req.body */
export const changeTitleRating = async (req, res) => {
    try {
        const { id, mediaType } = req.params;
        const { newRating } = req.body;
    
        await updateTitleRating(id, mediaType, newRating);

        res.status(200).json({ message: 'Successfully updated title rating.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update title rating.' });
    }
}

/** updates a titles watched count for the selectedSeason or a movies watched count */
export const changeWatchedCount = async (req, res) => {
    try {
        const { id, mediaType } = req.params;
        const { seasonNumber, watchedCount, episodeCount } = req.body;

        if (mediaType == 'tv') {
            await updateTvWatchedCount(id, seasonNumber, watchedCount, episodeCount);
        } else {
            await updateMovieWatchedCount(id, watchedCount);
        }

        res.status(200).json({ 
            message: 'Successfully updated watched episode count.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update episode count.' });
    }
}

/** recieves titleId from the req.params and removes it from the collection */
export const deleteSingleTitle = async (req, res) => {
    try {
        const { id, mediaType } = req.params;
    
        await deleteTitle(id, mediaType);

        res.status(200).json({ message: 'Successfully deleted title.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete title.' });
    }
}
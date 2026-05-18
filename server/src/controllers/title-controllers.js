import { getTitle, addToCollection, updateTitleStatus, deleteTitle, updateTitleRating, updateEpisodeCount, listOfStatuses, listOfRatings } from "../../database.js";


const getTitleFromApi = async (id, req, res) => {
    try {
        const response = await fetch(`https://api.imdbapi.dev/titles/${id}`);
        if (!response.ok) {
            return res.status(502).json({ message: 'Title retrieval service temporarily unavailable.' });
        }
        
        const data = await response.json();
        const title = {
            id: data.id,
            title: data.primaryTitle,
            type: data.type,
            startYear: data.startYear,
            endYear: data.endYear,
            genres: data.genres,
            rating: data.rating?.aggregateRating ?? 'N/A',
            plot: data.plot,
            thumbnail: data.primaryImage?.url || ''
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
        const { id } = req.params;
        let title;

        if (!id) {
            return res.status(400).json({ message: 'A title ID is required.' });
        }

        title = await getTitleFromDatabase(id, req, res);

        if (!title) {
            title = await getTitleFromApi(id, req, res);
        }

        res.json({ title });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch title. '});
    }
}

export async function addTitleToDatabase(req, res) {
    try {
        const { id } = req.params
        const { title, type, startYear, endYear, plot, thumbnail } = req.body;

        if (!id || !title) {
            return res.status(400).json({ message: 'ID and title are required.' });
        }
    
        await addToCollection(id, title, type, startYear, endYear, plot, thumbnail);

        res.status(201).json({ message: `'${title}' has been added to the collection.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add title to the database.' });
    }
}

/** updates a titles status to the selected option passed in the req.body */
export const changeTitleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;
        
        await updateTitleStatus(id, newStatus);

        res.status(200).json({ message: 'Successfully updated title status.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update title status.' });
    }


}

/** updates a titles rating to the selected option passed in the req.body */
export const changeTitleRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { newRating } = req.body;
    
        await updateTitleRating(id, newRating);

        res.status(200).json({ message: 'Successfully updated title rating.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update title rating.' });
    }
}

export const changeEpisodeCount = async (req, res) => {
    try {
        const { id } = req.params;
        const { titleType, seasonNumber, episodeCount, maxEpisodes } = req.body;

        await updateEpisodeCount(id, titleType, seasonNumber, episodeCount, maxEpisodes);

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
        const { id } = req.params;
    
        await deleteTitle(id);

        res.status(200).json({ message: 'Successfully deleted title.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete title.' });
    }
}
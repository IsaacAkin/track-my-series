import { watchlistLinks } from "../routes/index-routes.js";

/** returns an array of titles from the IMDB database that match the search query */
export async function getSeries(req, res) {
    const { searchTerm } = req.query;

    if (!searchTerm) {
        res.render('search', { searchTerm: '', results: [] });
    }

    try {
        const response = await fetch(`https://api.imdbapi.dev/search/titles?query=${searchTerm}`);
        if (!response.ok) {
            throw new Error("Problem fetching series information");
        }
        
        const data = await response.json();

        const results = data.titles.map(series => ({
            id: series.id,
            title: series.primaryTitle,
            originalTitle: series.originalTitle,
            type: series.type,
            rating: series.rating?.aggregateRating ?? 'N/A',
            thumbnail: series.primaryImage?.url || ''
        }));

        res.render('search', { searchTerm, results, watchlistLinks })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch search results');
    }
}

/** returns information from a specific title */
export async function getTitle(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('A title ID is required');
    }

    try {
        const response = await fetch(`https://api.imdbapi.dev/titles/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching title information.\n Response status: ${response.status} ${response.statusText}`);
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
        res.render('title', { title, watchlistLinks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch title information');
    }
}
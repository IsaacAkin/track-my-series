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
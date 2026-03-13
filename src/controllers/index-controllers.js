import { watchlistLinks } from "../routes/index-routes.js";
import { addToCollection } from "../../database.js";

/** returns an array of titles from the IMDB database that match the search query */
export async function getSeries(req, res) {
    try {
        const { searchTerm } = req.query;
    
        if (!searchTerm) {
            return res.render('search', { searchTerm: '', results: [] });
        }
        
        const response = await fetch(`https://api.imdbapi.dev/search/titles?query=${encodeURIComponent(searchTerm)}`); // added encoding to prevent url injection
        if (!response.ok) {
            return res.status(502).send('Search service temporarily unavailable.');
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
        
        res.render('search', { searchTerm, results, watchlistLinks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
}

/** returns information from a specific title */
export async function getTitle(req, res) {
    try {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).send('A title ID is required.');
        }

        const response = await fetch(`https://api.imdbapi.dev/titles/${id}`);
        if (!response.ok) {
            return res.status(502).send('Title retrieval service temporarily unavailable.');
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
        res.status(500).send('Internal server error');
    }
}

/** recieves JSON payload of series/movie data, calls the database function to add to the titles collection */
export async function addTitleToDatabase(req, res) {
    try {
        const { id, title, type, startYear, endYear, plot, thumbnail } = req.body;

        if (!id || !title) {
            return res.status(400).json({ message: 'ID and title are required.' });
        }
    
        await addToCollection(id, title, type, startYear, endYear, plot, thumbnail);

        res.status(201).json({ message: `'${title}' has been added to the collection.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add title to the database' });
    }
}
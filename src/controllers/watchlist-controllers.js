import { watchlistLinks } from "../routes/watchlist-routes.js";
import { getCollectionTitles, getTitle } from "../../database.js";

/** gets all titles in a specified collection and renders them on the specified page */
export const displayCollection = async (req, res) => {
    const { collection } = req.params;

    verifyCollection(res, collection);

    const titles = await getCollectionTitles(collection);
    const message = 'Nothing has been added yet';
    
    res.render(collection, { titles, message, collection , watchlistLinks });
}

/** gets a single title from the specified collection via its ID and renders it */
export const getSingleTitle = async (req, res) => {
    // add error handling for if an id doesnt exist
    const { id, collection } = req.params;

    verifyCollection(res, collection);
    const title = await getTitle(collection, id);

    if (!title) {
        res.status(404).send('Title not found.');
        return;
    }
    const currentCollection = collection;

    res.render('watchlist-title', { title, currentCollection, watchlistLinks });
}

/** checks to see if the specified collection is a valid collection */
const verifyCollection = (res, collection) => {
    const views = [
        'plan-to-watch',
        'watching',
        'on-hold',
        'completed'
    ];

    if (!views.includes(collection)) {
        return res.status(404).send('Collection not found.');
    }
}
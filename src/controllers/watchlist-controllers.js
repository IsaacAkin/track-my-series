import { watchlistLinks } from "../routes/watchlist-routes.js";
import { getCollectionTitles } from "../../database.js";

/** gets all titles in a specified collection and renders them on the specified page */
export const displayCollection = async (req, res) => {
    const { collection } = req.params;
    verifyCollection(res, collection);
    
    const titles = await getCollectionTitles(collection);
    const message = 'Nothing has been added yet';
    
    res.render(collection, { titles, message, collection , watchlistLinks });
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
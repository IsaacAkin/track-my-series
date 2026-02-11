import { watchlistLinks } from "../routes/watchlist-routes.js";
import { getCollectionTitles } from "../../database.js";

/** gets all titles in the plan-to-watch collection and renders them on the plan to watch page */
export const displayPlanToWatch = async (req, res) => {
    const titles = await getCollectionTitles('plan-to-watch');
    
    res.render('plan-to-watch', { titles, watchlistLinks })
}

/** gets all titles in the watching collection and renders them on the watching page */
export const displayWatching = async (req, res) => {
    const titles = await getCollectionTitles('watching');
    
    res.render('watching', { titles, watchlistLinks })
}

/** gets all titles in the on-hold collection and renders them on the on hold page */
export const displayOnHold = async (req, res) => {
    const titles = await getCollectionTitles('on-hold');

    res.render('on-hold', { titles, watchlistLinks })
}

/** gets all titles in the completed collection and renders them on the completed page */
export const displayCompleted = async (req, res) => {
    const titles = await getCollectionTitles('completed');

    res.render('completed', { titles, watchlistLinks })
}
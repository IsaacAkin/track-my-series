import { watchlistLinks } from "../routes/watchlist-routes.js";
import { getTitlesWithStatus, getTitle, updateTitleStatus } from "../../database.js";

/** gets all titles with the specified status and renders them on the specified page */
export const displayTitles = async (req, res) => {
    const { status } = req.params;

    verifyStatus(res, status);

    const titles = await getTitlesWithStatus(status);
    const message = 'Nothing has been added yet';
    
    res.render(status, { titles, message, status , watchlistLinks });
}

/** gets a single title from the specified collection via its ID and renders it */
export const getSingleTitle = async (req, res) => {
    const { id, status } = req.params;

    verifyStatus(res, status);
    const title = await getTitle(id);

    if (!title) {
        res.status(404).send('Title not found.');
        return;
    }

    const listOfStatuses = [
        { value: 'plan-to-watch', label: 'Plan To Watch'},
        { value: 'watching', label: 'Watching'},
        { value: 'on-hold', label: 'On Hold'},
        { value: 'completed', label: 'Completed'}
    ]

    res.render('watchlist-title', { title, listOfStatuses, watchlistLinks });
}

/** updates a titles status to the selected option passed in the req.body */
export const changeTitleStatus = async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    await updateTitleStatus(id, newStatus);

    res.json('Successfully title status');
}

/** checks to see if the specified collection is a valid collection */
const verifyStatus = (res, status) => {
    const views = [
        'plan-to-watch',
        'watching',
        'on-hold',
        'completed'
    ];

    if (!views.includes(status)) {
        return res.status(404).send(`'${status}' not found.`);
    }
}
import { watchlistLinks } from "../routes/watchlist-routes.js";
import { getTitlesWithStatus, getTitle, updateTitleStatus, deleteTitle, updateTitleRating } from "../../database.js";

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
    
    const listOfRatings = [
        { value: 0, label: 'No Rating'},
        { value: 1, label: '1 ⭐'},
        { value: 2, label: '2 ⭐'},
        { value: 3, label: '3 ⭐'},
        { value: 4, label: '4 ⭐'},
        { value: 5, label: '5 ⭐'}
    ]

    res.render('watchlist-title', { title, listOfStatuses, listOfRatings, watchlistLinks });
}

/** updates a titles status to the selected option passed in the req.body */
export const changeTitleStatus = async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    await updateTitleStatus(id, newStatus);

    res.json('Successfully title status');
}

/** updates a titles rating to the selected option passed in the req.body */
export const changeTitleRating = async (req, res) => {
    const { id } = req.params;
    const { newRating } = req.body;

    await updateTitleRating(id, newRating);

    res.json('Successfully title rating');
}

/** recieves titleId from the req.params and removes it from the collection */
export const removeSingleTitle = async (req, res) => {
    const { id } = req.params;

    await deleteTitle(id);

    res.json('Successfully deleted title from the collection');
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
import { watchlistLinks } from "../routes/watchlist-routes.js";
import { getTitlesWithStatus, getTitle, updateTitleStatus, deleteTitle, updateTitleRating } from "../../database.js";

/** gets all titles with the specified status and renders them on the specified page */
export const displayTitles = async (req, res) => {
    try {
        const { status } = req.params;
    
        if (!verifyStatus(res, status)) { return };
    
        const titles = await getTitlesWithStatus(status);
        const message = 'Nothing has been added yet';
        
        res.render(status, { titles, message, status , watchlistLinks });
    } catch (error) {
        console.error(error);
    }
}

/** gets a single title from the specified collection via its ID and renders it */
export const getSingleTitle = async (req, res) => {
    const listOfStatuses = [
        { value: 'plan-to-watch', label: 'Plan To Watch'},
        { value: 'watching', label: 'Watching'},
        { value: 'on-hold', label: 'On Hold'},
        { value: 'completed', label: 'Completed'}
    ];
    
    const listOfRatings = [
        { value: 0, label: 'No Rating'},
        { value: 1, label: '1 ⭐'},
        { value: 2, label: '2 ⭐'},
        { value: 3, label: '3 ⭐'},
        { value: 4, label: '4 ⭐'},
        { value: 5, label: '5 ⭐'}
    ];

    try {
        const { id, status } = req.params;
    
        if (!verifyStatus(res, status)) { return };
        const title = await getTitle(id);
    
        if (!title) {
            res.status(404).send('Title not found.');
            return;
        }
    
        res.render('watchlist-title', { title, listOfStatuses, listOfRatings, watchlistLinks });
    } catch (error) {
        console.error(error);
    }
}

/** updates a titles status to the selected option passed in the req.body */
export const changeTitleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;
        
        await updateTitleStatus(id, newStatus);
        res.status(200).json({ message: `Successfully changed title status to '${newStatus}.'` });
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
        res.status(200).json({ message: `Successfully changed title rating to '${newRating}'.` });
    } catch (error) {
        console.error(error);
        res.status9(500).json({ message: 'Failed to update title rating.' });
    }
}

/** recieves titleId from the req.params and removes it from the collection */
export const deleteSingleTitle = async (req, res) => {
    try {
        const { id } = req.params;
    
        await deleteTitle(id);
        res.status(200).json({ message: 'Successfully deleted title from the collection.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete title from the collection.' });
    }
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
        res.status(404).send(`'${status}' not found.`);
        return false;
    }

    return true;
}
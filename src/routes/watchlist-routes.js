import express from "express";
import { changeTitleRating, changeTitleStatus, displayTitles, getSingleTitle, deleteSingleTitle } from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/:status', displayTitles);
router.get('/:status/:id', getSingleTitle);

router.patch('/:status/:id/newrating', changeTitleRating);
router.patch('/:status/:id/newstatus', changeTitleStatus);

router.delete('/:status/:id', deleteSingleTitle);

export default router;
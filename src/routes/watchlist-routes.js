import express from "express";
import { changeTitleRating, changeTitleStatus, displayTitles, getSingleTitle, deleteSingleTitle, changeEpisodeCount } from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/:status', displayTitles);
router.get('/title/:id', getSingleTitle);

router.patch('/:id/newrating', changeTitleRating);
router.patch('/:id/newstatus', changeTitleStatus);
router.patch('/:id/incrementEpisode', changeEpisodeCount);

router.delete('/:id', deleteSingleTitle);

export default router;
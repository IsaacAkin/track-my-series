import express from "express";
import { changeTitleRating, changeTitleStatus, displayTitles, getSingleTitle, removeSingleTitle } from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/:status', displayTitles);
router.get('/:status/:id', getSingleTitle);

router.patch('/plan-to-watch/:id', changeTitleRating);
router.patch('/watching/:id', changeTitleRating);
router.patch('/on-hold/:id', changeTitleRating);
router.patch('/completed/:id', changeTitleRating);
router.patch('/:status/:id', changeTitleStatus);

router.delete('/:status/:id', removeSingleTitle);

export default router;
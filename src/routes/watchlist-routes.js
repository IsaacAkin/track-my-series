import express from "express";
import { displayTitles, getSingleTitle } from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/:status', displayTitles);
router.get('/:status/:id', getSingleTitle);

export default router;
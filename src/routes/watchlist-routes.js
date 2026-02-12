import express from "express";
import * as controller from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/collections/watching', text: 'Watching' },
    { href: '/watchlist/collections/completed', text: 'Completed' },
    { href: '/watchlist/collections/on-hold', text: 'On Hold' },
    { href: '/watchlist/collections/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/collections/:collection', controller.displayCollection);

export default router;
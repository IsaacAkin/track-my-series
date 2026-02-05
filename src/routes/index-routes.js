import express from "express";
import { getSeries } from "../controllers/index-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/', (req, res) => res.render('index', { watchlistLinks }));
router.get('/search', getSeries);

export default router;
import express from "express";
import { addToPlanToWatch, getSeries, getTitle } from "../controllers/index-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/collections/watching', text: 'Watching' },
    { href: '/watchlist/collections/completed', text: 'Completed' },
    { href: '/watchlist/collections/on-hold', text: 'On Hold' },
    { href: '/watchlist/collections/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/', (req, res) => res.render('index', { watchlistLinks }));
router.get('/search', getSeries);
router.get('/title/:id', getTitle);
router.post('/title/:id', addToPlanToWatch);

export default router;
import express from "express";

const router = express.Router();

const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/', (req, res) => res.render('index', { watchlistLinks }));
// router.get('/:searchTerm')

export default router;
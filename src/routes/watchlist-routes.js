import express from "express";

const router = express.Router();

const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/watching', (req, res) => res.render('watching', { watchlistLinks }));
router.get('/completed', (req, res) => res.render('completed', { watchlistLinks }));
router.get('/on-hold', (req, res) => res.render('on-hold', { watchlistLinks }));
router.get('/plan-to-watch', (req, res) => res.render('plan-to-watch', { watchlistLinks }));

export default router;
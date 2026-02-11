import express from "express";
import { displayPlanToWatch, displayWatching, displayOnHold, displayCompleted } from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/plan-to-watch', displayPlanToWatch);
router.get('/watching', displayWatching);
router.get('/on-hold', displayOnHold);
router.get('/completed', displayCompleted);

export default router;
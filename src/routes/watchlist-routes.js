import express from "express";
import * as controller from "../controllers/watchlist-controllers.js";

const router = express.Router();

export const watchlistLinks = [
    { href: '/watchlist/watching', text: 'Watching' },
    { href: '/watchlist/completed', text: 'Completed' },
    { href: '/watchlist/on-hold', text: 'On Hold' },
    { href: '/watchlist/plan-to-watch', text: 'Plan to Watch' },
];

router.get('/plan-to-watch', controller.displayPlanToWatch);
router.get('/watching', controller.displayWatching);
router.get('/on-hold', controller.displayOnHold);
router.get('/completed', controller.displayCompleted);

export default router;
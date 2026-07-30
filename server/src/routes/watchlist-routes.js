import express from "express";
import { fetchWatchlistTitles, fetchAllWatchlistTitles } from "../controllers/watchlist-controllers.js";

const router = express.Router();

router.get('/', fetchAllWatchlistTitles);
router.get('/:watchStatus', fetchWatchlistTitles);

export default router;
import express from "express";
import { changeTitleRating, changeTitleStatus, fetchTitle, addTitleToDatabase, deleteSingleTitle, changeWatchedCount } from "../controllers/title-controllers.js";

const router = express.Router();

router.get('/:mediaType/:id', fetchTitle);

router.post('/:mediaType/:id', addTitleToDatabase);

router.patch('/:mediaType/:id/rating', changeTitleRating);
router.patch('/:mediaType/:id/status', changeTitleStatus);
router.patch('/:mediaType/:id/episodecount', changeWatchedCount);

router.delete('/:mediaType/:id', deleteSingleTitle);

export default router;
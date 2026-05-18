import express from "express";
import { changeTitleRating, changeTitleStatus, fetchTitle, addTitleToDatabase, deleteSingleTitle, changeEpisodeCount } from "../controllers/title-controllers.js";

const router = express.Router();

router.get('/:id', fetchTitle);

router.post('/:id', addTitleToDatabase);

router.patch('/rating/:id', changeTitleRating);
router.patch('/status/:id', changeTitleStatus);
router.patch('/episodecount/:id', changeEpisodeCount);

router.delete('/:id', deleteSingleTitle);

export default router;
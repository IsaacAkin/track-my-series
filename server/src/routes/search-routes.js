import express from "express";
import { getListOfSeries } from "../controllers/search-controllers.js";

const router = express.Router();

router.get('/', getListOfSeries);

export default router;
import 'dotenv/config.js';
import path from 'node:path';
import express from "express";
import { fileURLToPath } from "node:url";
import indexRouter from "./routes/index-routes.js";
import collectionsRouter from "./routes/index-routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, 'client');

app.use(express.static(assetsPath));
// app.set('views', path.join(__dirname, 'client'));

app.use('/', indexRouter);
app.use('/watchlist', collectionsRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }

    // console.log(`Listening on port: ${PORT}`)
    console.log(`Listening on: http://localhost:${PORT}`)
})
import 'dotenv/config.js';
import path from 'node:path';
import express from "express";
import { fileURLToPath } from "node:url";
import indexRouter from "./src/routes/index-routes.js";
import watchlistRouter from "./src/routes/watchlist-routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, 'src/public'); // for accessing css and js

app.set('views', [
    path.join(__dirname, 'src/views'),
    path.join(__dirname, 'src/views/watchlist')
]);
app.set('view engine', 'ejs'); // views templete is set to use ejs
app.use(express.static(assetsPath));

app.use('/', indexRouter);
app.use('/watchlist', watchlistRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }

    console.log(`Listening on: http://localhost:${PORT}`)
})
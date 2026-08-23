import cors from 'cors';
import 'dotenv/config.js';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
// import indexRouter from "./src/routes/index-routes.js";
import searchRouter from "./src/routes/search-routes.js";
import titleRouter from "./src/routes/title-routes.js";
import watchlistRouter from "./src/routes/watchlist-routes.js";

const app = express();
const PORT = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  app.set('trust proxy', 1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json()); // to parse JSON data into req.body

// app.use('/api', indexRouter);
app.use('/api/search', searchRouter);
app.use('/api/title', titleRouter);
app.use('/api/watchlist', watchlistRouter);

const clientPath = path.join(__dirname, '../client/dist');
isProd && app.use(express.static(clientPath));

// app.get('/{*splat}', (req, res) => {
app.get('*', (req, res) => {
    if (isProd) {
        res.sendFile(path.join(clientPath, 'index.html'));
    } else {
        res.status(404).send('Page not found.');    
    }
});

// app.use((req, res) => {
//     res.status(404).send('Page not found.');
// }); // global handler when an invalid route is trying to be accessed

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }

    console.log(`Listening on: http://localhost:${PORT}`)
})
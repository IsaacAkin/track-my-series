import cors from 'cors';
import 'dotenv/config.js';
import express from "express";
// import indexRouter from "./src/routes/index-routes.js";
import titleRouter from "./src/routes/title-routes.js";
import watchlistRouter from "./src/routes/watchlist-routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // to parse JSON data into req.body

// app.use('/api', indexRouter);
app.use('/api/title', titleRouter);
app.use('/api/watchlist', watchlistRouter);

app.use((req, res) => {
    res.status(404).send('Page not found.');
}); // global handler when an invalid route is trying to be accessed

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }

    console.log(`Listening on: http://localhost:${PORT}`)
})
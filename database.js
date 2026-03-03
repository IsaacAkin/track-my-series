import { MongoClient } from "mongodb";

const uri = process.env.URI;
const client = new MongoClient(uri);
const trackMySeriesDB = 'track-my-series';
const titlesCollection = 'titles';

/** tests database connection to make sure everything is okay */
const connectToDatabase = async () => {
    try {
        await client.connect(trackMySeriesDB);
        console.log(`Connected to the ${trackMySeriesDB} database.`);
    } catch (err) {
        console.error(`Error connecting to database: ${err}`);
    }
}

/** adds a new series/movie document into the titles collection */
export const addToCollection = async (id, title, type, startYear, endYear, plot, thumbnail) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = { 
            _id: id, 
            title: title, 
            type: type, 
            startYear: startYear, 
            endYear: endYear, 
            plot: plot, 
            thumbnail: thumbnail, 
            status: 'plan-to-watch' 
        };

        const result = await collection.insertOne(query);
        console.log(`'${title}' has been added to the '${titlesCollection}' collection with the _id: ${result.insertedId} and status of 'plan-to-watch'.`);
    } catch (error) {
        console.error('Error adding series to the collection:', error);
    } finally {
        await client.close();
    }
}

/** returns a populated array of all series with the specified status from the titles collection */
export const getTitlesWithStatus = async (status) => {
    const titles = [];

    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = collection.find({ status: status });

        for await (const title of query) {
            titles.push(title);
        }

        if (titles.length === 0) {
            console.log(`No titles found with the status of '${status}'.`);
            return titles;
        }
        
        console.log(`${titles.length} titles found with the status of '${status}'.`);
        return titles;
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

/** returns the information of a single title in the database based on the ID provided */
export const getTitle = async (titleId, status) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        
        const query = { _id: titleId, status: status }
        const title = await collection.findOne(query);

        if (!title) {
            return null;
        }

        console.log(`Title with _id: ${titleId} and status: ${status} found:`);
        console.log(title);
        return title;
    } catch (error) {
        console.error(`Title with _id: ${titleId} and status: ${status} could not be found in the collection:`, error);
    } finally {
        client.close();
    }
}
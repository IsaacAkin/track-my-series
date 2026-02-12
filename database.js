import { MongoClient } from "mongodb";

const uri = process.env.URI;
const client = new MongoClient(uri);

/** tests database connection to make sure everything is okay */
const connectToDatabase = async () => {
    try {
        await client.connect('track-my-series');
        console.log(`Connected to the track-my-series database.`);
    } catch (err) {
        console.error(`Error connecting to database: ${err}`);
    }
}

/** adds a new series/movie document into the specified collection */
export const addToCollection = async (collectionName, id, title, type, startYear, endYear, plot, thumbnail) => {
    try {
        await connectToDatabase();
        const planToWatch = client.db('track-my-series').collection(collectionName);
        const query = { _id: id, title: title, type: type, startYear: startYear, endYear: endYear, plot: plot, thumbnail: thumbnail }

        const result = await planToWatch.insertOne(query);
        console.log(`'${title}' has been added to the 'plan to watch' collection with the _id: ${result.insertedId}.`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

/** returns a populated array of all titles from a specified collection */
export const getCollectionTitles = async (collectionName) => {
    const titles = [];

    try {
        await connectToDatabase();
        const collection = client.db('track-my-series').collection(collectionName);
        const query = collection.find();

        for await (const title of query) {
            titles.push(title);
        }

        return titles;
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

/** returns a single titles information based on the ID provided */
export const getTitle = async (collectionName, titleId) => {
    try {
        await connectToDatabase();
        const collection = client.db('track-my-series').collection(collectionName);
        
        const query = { _id: titleId }
        const title = await collection.findOne(query);

        return title;
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}
import { MongoClient } from "mongodb";

const uri = process.env.URI;
const client = new MongoClient(uri);
const trackMySeriesDB = 'track-my-series';
const titlesCollection = 'titles';

export const listOfStatuses = [
    { value: 'plan-to-watch', label: 'Plan To Watch'},
    { value: 'watching', label: 'Watching'},
    { value: 'on-hold', label: 'On Hold'},
    { value: 'completed', label: 'Completed'}
];

export const listOfRatings = [
    { value: 0, label: 'No Rating'},
    { value: 1, label: '1 ⭐'},
    { value: 2, label: '2 ⭐'},
    { value: 3, label: '3 ⭐'},
    { value: 4, label: '4 ⭐'},
    { value: 5, label: '5 ⭐'}
];

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
            status: 'plan-to-watch',
            seasons: type != 'movie' 
            ? [
                {"season": 1, "total_episodes": 1, "watched_episodes": 0}
            ] 
            : [
                {"total_episodes": 1, "watched_episodes": 0}
            ]
        };

        const result = await collection.insertOne(query);
        console.log(`'${title}' has been added to the '${titlesCollection}' collection with the _id: ${result.insertedId} and status of 'plan-to-watch'.`);
    } catch (error) {
        console.error('Error adding series to the collection:', error);
    } finally {
        await client.close();
    }
}

/** finds title information by ID and updates the watch status */
export const updateTitleStatus = async (titleId, newStatus) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
    
        const documentToChange = await collection.findOne({ _id: titleId });
        if (documentToChange === undefined) {
            throw new Error(`Could not find _id in the ${titlesCollection} collection.`);
        }
        const oldStatus = documentToChange.status;
        
        const filter = { _id: titleId };
        const updateDoc = {
            $set: {
                status: newStatus
            }
        };
    
        const result = await collection.updateOne(filter, updateDoc);
        result.modifiedCount > 0 ? console.log(`Updated ${result.modifiedCount} document.`) : console.log(`${result.modifiedCount} documents updated.`);
        console.log(`Updated the status of '${documentToChange.title}' from '${oldStatus}' to '${newStatus}'.`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

/** finds title information by ID and updates the rating */
export const updateTitleRating = async (titleId, newRating) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
    
        const documentToChange = await collection.findOne({ _id: titleId });
        if (documentToChange === undefined) {
            throw new Error(`Could not find _id in the ${titlesCollection} collection.`);
        }
        const oldRating = documentToChange.rating;
        
        const filter = { _id: titleId };
        const updateDoc = {
            $set: {
                rating: Number(newRating)
            }
        };
    
        const result = await collection.updateOne(filter, updateDoc);
        result.modifiedCount > 0 ? console.log(`Updated ${result.modifiedCount} document.`) : console.log(`${result.modifiedCount} documents updated.`);
        console.log(`Updated the rating of '${documentToChange.title}' from '${oldRating === 0 ? 'No Rating' : oldRating}' to '${newRating == 0 ? 'No Rating' : newRating}'.`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

export const updateEpisodeCount = async (titleId, seasonNumber, episodeCount, totalEpisodes) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        
        const documentToChange = await collection.findOne({ _id: titleId });
        if (documentToChange === undefined) {
            throw new Error(`Could not find _id in the ${titlesCollection} collection.`);
        }

        if (episodeCount > totalEpisodes) {
            throw new Error("Episode count can not exceed the total amount of episodes.");
        } else if (episodeCount < 0) {
            throw new Error("Episode count cannot be less than 0");
        }
        
        const filter = { 
            _id: titleId,
            "seasons.season": Number(seasonNumber)
         };
        const updateDoc = {
            $set: {
                "seasons.$.watched_episodes": Number(episodeCount)
            }
        };
    
        const result = await collection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) { console.log(`Season not found in '${documentToChange.title}'`); }
        result.modifiedCount > 0 ? console.log(`Updated ${result.modifiedCount} document.`) : console.log(`${result.modifiedCount} documents updated.`);
        console.log(`Updated the watched episodes of '${documentToChange.title}' to '${episodeCount}'.`);
    } catch (error) {
        console.error(error);
    } finally{
        client.close();
    }
}

/** returns a populated array of all series with the specified status from the titles collection */
export const getTitlesWithStatus = async (status) => {
    const titles = [];

    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = collection.find({ status: status }).sort({ title: 1 }); // sorts results in alphabetical order

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
export const getTitle = async (titleId) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        
        const query = { _id: titleId }
        const title = await collection.findOne(query);

        if (!title) {
            return null;
        }

        console.log(`Title with _id: ${titleId} found:`);
        console.log(title);
        return title;
    } catch (error) {
        console.error(`Title with _id: ${titleId} could not be found in the collection:`, error);
    } finally {
        client.close();
    }
}

/** deletes a title from the database via the _id provided */
export const deleteTitle = async (titleId) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);

        const query = { _id: titleId };
        const titleToDelete = await collection.deleteOne(query);

        titleToDelete.deletedCount === 1 
        ? console.log('Successfully deleted 1 document from the collection')
        : console.log('No documents matched the query. Deleted 0 documents.');
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
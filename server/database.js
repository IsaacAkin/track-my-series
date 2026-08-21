import { MongoClient } from "mongodb";

const uri = process.env.URI;
const client = new MongoClient(uri);
const trackMySeriesDB = process.env.DATABASE;
const titlesCollection = process.env.COLLECTION;

export const listOfStatuses = [
    { value: 'planning', label: 'Planning'},
    { value: 'watching', label: 'Watching'},
    { value: 'paused', label: 'Paused'},
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

/** adds a new tv series to the database */
const addTvSeries = async (id, title, originalTitle, mediaType, startDate, endDate, originalLanguage, genres, airing, overview, watchStatus, seasons, posterSrc) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = { 
            _id: Number(id), 
            title: title, 
            original_title: originalTitle,
            media_type: mediaType, 
            start_date: startDate.split('-').reverse().join('-'), 
            end_date: endDate.split('-').reverse().join('-'), 
            original_language: originalLanguage,
            genres: genres,
            airing: airing,
            overview: overview, 
            watch_status: watchStatus,
            seasons: seasons,
            poster_src: posterSrc
        }

        const result = await collection.insertOne(query);
        console.log(`'${title}' has been added to the '${titlesCollection}' collection with the _id: ${result.insertedId} and status of '${watchStatus}'.`);
    } catch (error) {
        console.error('Error adding tv series to the collection:', error);
    } finally {
        await client.close();
    }
}

/** adds a new movie to the database */
const addMovie = async (id, title, originalTitle, mediaType, releaseDate, originalLanguage, genres, overview, watchStatus, posterSrc) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = { 
            _id: Number(id), 
            title: title, 
            original_title: originalTitle,
            media_type: mediaType, 
            release_date: releaseDate.split('-').reverse().join('-'),
            original_language: originalLanguage,
            genres: genres,
            overview: overview, 
            watch_status: watchStatus,
            watched: watchStatus == 'completed' ? true : false,
            poster_src: posterSrc
        }

        const result = await collection.insertOne(query);
        console.log(`'${title}' has been added to the '${titlesCollection}' collection with the _id: ${result.insertedId} and status of '${watchStatus}'.`);
    } catch (error) {
        console.error('Error adding movie to the collection:', error);
    } finally {
        await client.close();
    }
}

/** adds a new tv series or movie document into the titles collection depending on the media type */
export const addToCollection = async (id, title, originalTitle, mediaType, startYear, endYear, releaseDate, originalLanguage, genres, airing, overview, watchStatus, seasons, posterSrc) => {
    mediaType == 'tv'
    ? addTvSeries(id, title, originalTitle, mediaType, startYear, endYear, originalLanguage, genres, airing, overview, watchStatus, seasons, posterSrc)
    : addMovie(id, title, originalTitle, mediaType, releaseDate, originalLanguage, genres, overview, watchStatus, posterSrc);
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
        const oldStatus = documentToChange.watch_status;
        
        const filter = { _id: titleId };
        const updateDoc = {
            $set: {
                watch_status: newStatus
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
        console.log(`Updated the rating of '${documentToChange.title}' from '${oldRating === 0 || !oldRating ? 'No Rating' : oldRating}' to '${newRating == 0 ? 'No Rating' : newRating}'.`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

export const updateTvWatchedCount = async (titleId, seasonNumber, watchedCount, episodeCount) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        
        const documentToChange = await collection.findOne({ media_type: 'tv', _id: Number(titleId) });
        if (documentToChange === null) {
            throw new Error(`Could not find _id in the ${titlesCollection} collection.`);
        }

        if (watchedCount > episodeCount) {
            throw new Error("Episode count can not exceed the total amount of episodes.");
        } else if (watchedCount < 0) {
            throw new Error("Episode count cannot be less than 0");
        }

        const filter = {
            media_type: 'tv',
            _id: Number(titleId),
            'seasons.season_number': Number(seasonNumber)
        };
        const updateDoc = {
            $set: {
                'seasons.$.watched_count': Number(watchedCount)
            }
        }
    
        const result = await collection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) console.log(`Season ${seasonNumber} not found in '${documentToChange.title}'`);
        result.modifiedCount > 0 ? console.log(`Updated ${result.modifiedCount} document.`) : console.log(`${result.modifiedCount} documents updated.`);
        console.log(`Updated the watched episodes of '${documentToChange.title}' to '${watchedCount}'.`);
    } catch (error) {
        console.error(error);
    } finally{
        client.close();
    }
}

export const updateMovieWatchedCount = async (titleId, watchedCount) => {
    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        
        const documentToChange = await collection.findOne({ media_type: 'movie', _id: Number(titleId) });
        if (documentToChange === null) {
            throw new Error(`Could not find an _id with that value in the '${titlesCollection}' collection.`);
        }

        if (watchedCount > 1) {
            throw new Error("Movie watched count can not exceed 1.");
        } else if (watchedCount < 0) {
            throw new Error("Movie watched count cannot be less than 0");
        }

        const filter = {
            media_type: 'movie',
            _id: Number(titleId),
        };

        const updateDoc = {
            $set: {
                watched: Number(watchedCount) === 1 ? true : false
            }
        };
    
        const result = await collection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) { console.log(`Failed to update movie watched count`); }
        result.modifiedCount > 0 ? console.log(`Updated ${result.modifiedCount} document.`) : console.log(`${result.modifiedCount} document updated.`);
        console.log(`Updated the watched count of '${documentToChange.title}' to '${watchedCount}'.`);
    } catch (error) {
        console.error(error);
    } finally{
        client.close();
    }
}

/** returns a populated array of all series with the specified status from the titles collection */
export const getTitlesWithStatus = async (watchStatus) => {
    const titles = [];

    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = collection.find({ watch_status: watchStatus }).sort({ title: 1 }); // sorts results in alphabetical order

        for await (const title of query) {
            titles.push(title);
        }

        if (titles.length === 0) {
            console.log(`No titles found with the status of '${watchStatus}'.`);
            return titles;
        }
        
        console.log(`${titles.length} titles found with the status of '${watchStatus}'.`);
        return titles;
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
}

/** returns a populated array of all series from the titles collection */
export const getAllTitles = async () => {
    const titles = [];

    try {
        await connectToDatabase();
        const collection = client.db(trackMySeriesDB).collection(titlesCollection);
        const query = collection.find().sort({ title: 1 }); // sorts results in alphabetical order

        for await (const title of query) {
            titles.push(title);
        }

        if (titles.length === 0) {
            console.log(`No titles found.`);
            return titles;
        }
        
        console.log(`${titles.length} titles found.`);
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
        
        const query = { _id: Number(titleId) }
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
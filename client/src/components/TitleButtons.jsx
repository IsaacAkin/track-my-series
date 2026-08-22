import { useState } from "react";
import { addToDatabase, removeTitleFromDatabase, updateTitleWatchStatus, updateTitleRating, updateTvWatchedCount, updateMovieWatchedCount } from "../services/api.js";

export const AddTitleBtn = ({ title }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addTitle = async (e) => {
        const selectedStatus = e.target.value;
        setLoading(true);
        
        try {
            const response = await addToDatabase(title, selectedStatus);
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            { error && <p>Error adding title</p> }
            {
                loading
                ? 
                <>
                    <p>Adding...</p>
                </>
                :
                    <select name="watchstatus-dropdown" id="watchstatus-dropdown" defaultValue={''} onChange={addTitle}>
                        <option value="" disabled>Add to Watchlist</option>
                        <option value="plan-to-watch">Planning</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">Paused</option>
                        <option value="watching">Watching</option>
                    </select>
            }
        </div>
    )
}

export function SeasonsDropdown({ title }) {
    const seasons = title.seasons;
    const [currentSeason, setCurrentSeason] = useState(title.media_type == 'tv' && seasons[0].season_number);
    const [episodeCount, setEpisodeCount] = useState(title.media_type == 'tv' ? title.seasons[0].episode_count : 1);
    const [watchedCount, setWatchedCount] = useState(title.media_type == 'tv' ? title.seasons[0].watched_count : title.watched == false ? 0 : 1);

    const fetchSeasonInformation = (e) => {
        const foundSeason = seasons.find(season => season.season_number == Number(e.target.value));
        setCurrentSeason(foundSeason);
        setEpisodeCount(foundSeason.episode_count);
        setWatchedCount(foundSeason.watched_count);
    }

    return (
        <>
            {
                seasons && title.media_type == 'tv'
                ?
                <>
                    <select name="seasons-dropdown" id="seasons-dropdown" defaultValue={currentSeason} onChange={fetchSeasonInformation}>
                        {
                            seasons.map(season => (
                                <option key={season.season_number} value={season.season_number}>Season {season.season_number}</option>
                            ))
                        }
                    </select>
                    <TvEpisodeHandler title={title} currentSeason={currentSeason} episodeCount={episodeCount} watchedCount={watchedCount} updateWatchedCount={setWatchedCount} />
                </>
                : <MovieEpisodeHandler title={title} watchedCount={watchedCount} updateWatchedCount={setWatchedCount} />
            }
        </>
    )
}

function TvEpisodeHandler({ title, currentSeason, episodeCount, watchedCount, updateWatchedCount, onBlur }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const incrementCount = async () => {
        if (watchedCount + 1 > episodeCount) {
            return;
        }
        updateWatchedCount(watchedCount++);
        setLoading(true);
        
        try {
            const response = await updateTvWatchedCount(title._id, title.media_type, currentSeason.season_number, watchedCount, episodeCount);
            if (!response.ok) {
                updateWatchedCount(watchedCount--);
            }
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    
    const decrementCount = async () => {
        if (watchedCount - 1 < 0) {
            return;
        }
        updateWatchedCount(watchedCount--);
        setLoading(true);
        
        try {
            const response = await updateTvWatchedCount(title._id, title.media_type, currentSeason.season_number, watchedCount, episodeCount);
            if (!response.ok) {
                updateWatchedCount(watchedCount--);
            }
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="episodeHandler">
            <input type="number"
            name="watched_count" 
            id="watched_count"
            value={watchedCount}
            onChange={onBlur}
            />
            /
            <input type="number"
            name="episode_count" 
            id="episode_count"
            value={episodeCount}
            onChange={onBlur}
            disabled
            />
            { error && <p>Error updating episode count</p> }
            {
                loading
                ? 
                <>
                    <p>Updating episode count...</p>
                </>
                :
                <>
                    <button type="button" className="decrement-btn" onClick={decrementCount}>-</button>
                    <button type="button" className="increment-btn" onClick={incrementCount}>+</button>
                </>
            }
        </div>
    )
}

export function MovieEpisodeHandler({ title, watchedCount, updateWatchedCount }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const incrementCount = async () => {
        if (watchedCount + 1 > 1) {
            return;
        }

        updateWatchedCount(watchedCount++)
        setLoading(true);
        
        try {
            const response = await updateMovieWatchedCount(title._id, title.media_type, watchedCount);
            if (!response.ok) {
                updateWatchedCount(watchedCount--)
            }
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    
    const decrementCount = async () => {
        if (watchedCount - 1 < 0) {
            return;
        }
        updateWatchedCount(watchedCount--)
        setLoading(true);
        
        try {
            const response = await updateMovieWatchedCount(title._id, title.media_type, watchedCount);
            if (!response.ok) {
                updateWatchedCount(watchedCount++)
            }
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="episodeHandler">
            <input type="number"
            name="watched_count" 
            id="watched_count"
            value={watchedCount}
            />
            /
            <input type="number"
            name="episode_count" 
            id="episode_count"
            value={1}
            disabled
            />
            { error && <p>Error updating episode count</p> }
            {
                loading
                ? 
                <>
                    <p>Updating episode count...</p>
                </>
                :
                <>
                    <button type="button" className="decrement-btn" onClick={decrementCount}>-</button>
                    <button type="button" className="increment-btn" onClick={incrementCount}>+</button>
                </>
            }
        </div>
    )
}

export const UpdateStatusBtn = ({ title }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(title.watch_status);

    const changeStatus = async (e) => {
        const selectedStatus = e.target.value;
        setLoading(true);
        
        try {
            const response = await updateTitleWatchStatus(title._id, title.media_type, selectedStatus);

            if (!response.ok) {
                console.log(response.message);
            }

            console.log(response.message);
            setStatus(selectedStatus);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            { error && <p>Error updating status</p> }
            {
                loading
                ? 
                <>
                    <p>Updating watch status...</p>
                </>
                :
                    <select name="watchstatus-dropdown" id="watchstatus-dropdown" defaultValue={status} onChange={changeStatus}>
                        <option value="planning">Planning</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                        <option value="watching">Watching</option>
                    </select>
            }
        </div>
    )
}

export const SetTitleRating = ({ title }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(title.rating ? title.rating : '0')

    const changeRating = async (e) => {
        const selectedRating = e.target.value;
        setLoading(true);
        
        try {
            const response = await updateTitleRating(title._id, title.media_type, selectedRating);

            if (!response.ok) {
                console.log(response.message);
            }

            console.log(response.message);
            setRating(selectedRating);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            { error && <p>Error updating rating</p> }
            {
                loading
                ? 
                <>
                    <p>Updating rating...</p>
                </>
                :
                    <select name="rating-dropdown" id="rating-dropdown" defaultValue={rating} onChange={changeRating}>
                        <option value="0">No Rating</option>
                        <option value="1">1⭐</option>
                        <option value="2">2⭐</option>
                        <option value="3">3⭐</option>
                        <option value="4">4⭐</option>
                        <option value="5">5⭐</option>
                    </select>
            }
        </div>
    )
}

export const DeleteTitleBtn = ({ id }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deteleTitle = async () => {
        setLoading(true);
        
        try {
            const response = await removeTitleFromDatabase(id);
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            { error && <p>Error deleting title</p> }
            {
                loading
                ? 
                <>
                    <p>Deleting...</p>
                    <button onClick={deteleTitle} className="hidden" >🗑️</button>
                </>
                : <button onClick={deteleTitle}>🗑️</button>
            }
        </div>
    )   
}
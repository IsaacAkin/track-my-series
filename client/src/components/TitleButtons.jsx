import { useState } from "react";
import { addToDatabase, removeTitleFromDatabase, updateTitleWatchStatus, updateTitleRating, updateTitleEpisodeCount } from "../services/api.js";

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
    const [currentSeason, setCurrentSeason] = useState(seasons[0].season);
    const [totalEpisodes, setTotalEpisodes] = useState(title.seasons[0].total_episodes);
    const [watchedEpisodes, setWatchedEpisodes] = useState(title.seasons[0].watched_episodes);

    const fetchSeasonInformation = (e) => {
        const foundSeason = seasons.find(season => season.season == Number(e.target.value));
        setCurrentSeason(foundSeason);
        setTotalEpisodes(foundSeason.total_episodes);
        setWatchedEpisodes(foundSeason.watched_episodes);
    }

    return (
        <>
            {
                seasons && title.type !== 'movie'
                ?
                <>
                    <select name="seasons-dropdown" id="seasons-dropdown" defaultValue={currentSeason} onChange={fetchSeasonInformation}>
                        {
                            seasons.map(season => (
                                <option key={season.season} value={season.season}>Season {season.season}</option>
                            ))
                        }
                    </select>
                    <ButtonHandler title={title} currentSeason={currentSeason} totalEpisodes={totalEpisodes} watchedEpisodes={watchedEpisodes} updateWatched={setWatchedEpisodes} />
                </>
                : <p>Watched</p>
            }
        </>
    )
}

function ButtonHandler({ title, currentSeason, totalEpisodes, watchedEpisodes, updateWatched, onBlur }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const incrementCount = async () => {
        if (watchedEpisodes + 1 > totalEpisodes) {
            return;
        }
        updateWatched(watchedEpisodes++);
        setLoading(true);
        
        try {
            const response = await updateTitleEpisodeCount(title._id, title.type, currentSeason.season, watchedEpisodes, totalEpisodes);
            if (!response.ok) {
                updateWatched(watchedEpisodes--);
            }
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    
    const decrementCount = async () => {
        if (watchedEpisodes - 1 < 0) {
            return;
        }
        updateWatched(watchedEpisodes--);
        setLoading(true);
        
        try {
            const response = await updateTitleEpisodeCount(title._id, title.type, currentSeason.season, watchedEpisodes, totalEpisodes);
            if (!response.ok) {
                updateWatched(watchedEpisodes--);
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
            name="total_episodes" 
            id="total_episodes"
            value={totalEpisodes}
            onChange={onBlur}
            disabled
            />
            /
            <input type="number"
            name="watched_episodes" 
            id="watched_episodes"
            value={watchedEpisodes}
            onChange={onBlur}
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
    const [status, setStatus] = useState(title.status);

    const changeStatus = async (e) => {
        const selectedStatus = e.target.value;
        setLoading(true);
        
        try {
            const response = await updateTitleWatchStatus(title._id, selectedStatus);

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
                        <option value="plan-to-watch">Planning</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">Paused</option>
                        <option value="watching">Watching</option>
                    </select>
            }
        </div>
    )
}

export const SetTitleRating = ({ title }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const changeRating = async (e) => {
        const selectedRating = e.target.value;
        setLoading(true);
        
        try {
            const response = await updateTitleRating(title._id, selectedRating);
            console.log(response.message);
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
                    <select name="rating-dropdown" id="rating-dropdown" defaultValue={title.rating ? title.rating : '0'} onChange={changeRating}>
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
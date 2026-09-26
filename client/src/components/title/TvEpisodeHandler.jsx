import { useState } from "react";
import { updateTvWatchedCount } from "../../services/api.js"

export default function TvEpisodeHandler({ title, currentSeason, episodeCount, watchedCount, updateWatchedCount, onBlur }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const incrementCount = async () => {
        if (watchedCount + 1 > episodeCount) {
            return;
        }
        updateWatchedCount(watchedCount++);
        setLoading(true);
        
        try {
            const response = await updateTvWatchedCount(title._id, title.media_type, currentSeason, watchedCount, episodeCount);
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
            const response = await updateTvWatchedCount(title._id, title.media_type, currentSeason, watchedCount, episodeCount);
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
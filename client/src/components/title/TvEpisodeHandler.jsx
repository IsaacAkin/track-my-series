import { useState } from "react";
import Modal from "../Modal.jsx";
import { updateTvWatchedCount } from "../../services/api.js"

export default function TvEpisodeHandler({ title, currentSeason, episodeCount, watchedCount, updateWatchedCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    async function closeModal() {
        // updates the databases watchedCount when the user saves the changes made
        setLoading(true);
        try {
            await updateTvWatchedCount(title._id, title.media_type, currentSeason, watchedCount, episodeCount);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    }

    const onChange = (e) => {
        // updates watchedCount state when the value is changed
        if (e.target.value > episodeCount || e.target.value  < 0 || isNaN(e.target.value)) {
            return;
        } else {
            const newWatchedCount = Number(e.target.value);
            updateWatchedCount(newWatchedCount);
        }
    }

    if (isOpen) {
        return (
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="episodeHandler">
                    <input type="number"
                    name="watched_count" 
                    id="watched_count"
                    value={watchedCount}
                    onChange={onChange}
                    />
                    /
                    <input type="number"
                    name="episode_count" 
                    id="episode_count"
                    value={episodeCount}
                    readOnly
                    />
                    {error && <p>{error}</p>}
                    {loading && <p>Updating episode count...</p>}
                    <button type="button" className="close-modal-button" onClick={closeModal}>Save</button>
                </div>
            </Modal>
        )
    }

    return (
        <div className="episodeHandler">
            <input type="number"
            name="watched_count" 
            id="watched_count"
            value={watchedCount}
            readOnly
            />
            /
            <input type="number"
            name="episode_count" 
            id="episode_count"
            value={episodeCount}
            readOnly
            />
            <button type="button" className="episode-count-modal-button" onClick={openModal}>Edit</button>
        </div>
    )
}
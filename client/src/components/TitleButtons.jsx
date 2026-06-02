import { useState } from "react";
import { addToDatabase, removeTitleFromDatabase, updateTitleWatchStatus, updateTitleRating } from "../services/api.js";

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

export const UpdateStatusBtn = ({ title }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const changeStatus = async (e) => {
        const selectedStatus = e.target.value;
        setLoading(true);
        
        try {
            const response = await updateTitleWatchStatus(title._id, selectedStatus);
            console.log(response.message);
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
                    <select name="watchstatus-dropdown" id="watchstatus-dropdown" defaultValue={title.status} onChange={changeStatus}>
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
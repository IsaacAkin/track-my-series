import { useState } from "react";
import { addToDatabase, removeTitleFromDatabase } from "../services/api.js";

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
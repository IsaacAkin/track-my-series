import { useState } from "react";
import { addToDatabase, removeTitleFromDatabase } from "../services/api.js";

export const AddTitleBtn = ({ title }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addTitle = async () => {
        setLoading(true);
        
        try {
            const response = await addToDatabase(title);
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
                    <button onClick={addTitle} className="hidden" >Add to Watchlist</button>
                </>
                : <button onClick={addTitle}>Add to Watchlist</button>
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
import { useState } from "react";
import { addToDatabase } from "../../services/api.js"

// Adds a tvseries/movie to the database when clicked
export default function AddTitleButton({ title }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Adds a title with the watch status of the selected value
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
                        <option value="planning">Planning</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                        <option value="watching">Watching</option>
                    </select>
            }
        </div>
    )
}
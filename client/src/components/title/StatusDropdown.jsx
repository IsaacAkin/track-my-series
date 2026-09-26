import { useState } from "react";
import { updateTitleWatchStatus } from "../../services/api.js"

// A dropdown that displays and handles all actions relating to a titles watch status
export default function StatusDropdown({ title }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(title.watch_status);

    // Updates and changes a titles watch status when a new watch status is selected
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
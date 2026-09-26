import { useState } from "react";
import { updateTitleRating } from "../../services/api.js"

export default function SetTitleRating({ title }) {
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
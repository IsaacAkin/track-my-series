import { useState, useEffect } from "react";
import TitlesList from "../../components/TitlesList";
import { fetchTitlesFromDatabase } from "../../services/api.js";

export default function Completed() {
    const [completed, setCompleted] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchCompleted() {
            try {
                const response = await fetchTitlesFromDatabase('completed');

                if (!ignore) {
                    setCompleted(response.titles);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCompleted();

        return () => {
            ignore = true;
        }
    }, [])

    return(
        <>
            {error && <p style={{ textAlign: 'center', color: 'white'}}>Error loading content</p>}
            {loading && <p style={{ textAlign: 'center', color: 'white'}}>Loading...</p>}
            {completed && completed.length < 1 && <p style={{ textAlign: 'center', color: 'white'}}>Nothing added yet</p>}
            <TitlesList watchStatus={completed} />
        </>
    )
}
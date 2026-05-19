import { useState, useEffect } from "react";
import TitlesList from "../../components/TitlesList";

export default function Completed() {
    const [completed, setCompleted] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchWatching() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/watchlist/completed`);

                if (!response) {
                    throw new Error(`Error ${response.status}`);
                }

                if (!ignore) {
                    const data = await response.json();
                    setCompleted(data.titles);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchWatching();

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
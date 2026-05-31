import { useState, useEffect } from "react";
import TitlesList from "../../components/TitlesList";
import { fetchTitlesFromDatabase } from "../../services/api.js";

export default function Watching() {
    const [watching, setWatching] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchWatching() {
            try {
                const response = await fetchTitlesFromDatabase('watching');

                if (!ignore) {
                    setWatching(response.titles);
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
            {watching && watching.length < 1 && <p style={{ textAlign: 'center', color: 'white'}}>Nothing added yet</p>}
            <TitlesList watchStatus={watching} />
        </>
    )
}
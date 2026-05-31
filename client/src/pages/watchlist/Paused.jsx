import { useState, useEffect } from "react";
import TitlesList from "../../components/TitlesList";
import { fetchTitlesFromDatabase } from "../../services/api.js";

export default function Paused() {
    const [paused, setPaused] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchPaused() {
            try {
                const response = await fetchTitlesFromDatabase('on-hold');

                if (!ignore) {
                    setPaused(response.titles);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPaused();

        return () => {
            ignore = true;
        }
    }, [])

    return(
        <>
            {error && <p style={{ textAlign: 'center', color: 'white'}}>Error loading content</p>}
            {loading && <p style={{ textAlign: 'center', color: 'white'}}>Loading...</p>}
            {paused && paused.length < 1 && <p style={{ textAlign: 'center', color: 'white'}}>Nothing added yet</p>}
            <TitlesList watchStatus={paused} />
        </>
    )
}
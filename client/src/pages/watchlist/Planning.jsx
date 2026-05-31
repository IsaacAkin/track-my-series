import { useState, useEffect } from "react";
import TitlesList from "../../components/TitlesList";
import { fetchTitlesFromDatabase } from "../../services/api.js";

export default function Planning() {
    const [planning, setPlanning] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchPlanning() {
            try {
                const response = await fetchTitlesFromDatabase('plan-to-watch');

                if (!ignore) {
                    setPlanning(response.titles);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPlanning();

        return () => {
            ignore = true;
        }
    }, [])

    return(
        <>
            {error && <p style={{ textAlign: 'center', color: 'white'}}>Error loading content</p>}
            {loading && <p style={{ textAlign: 'center', color: 'white'}}>Loading...</p>}
            {planning && planning.length < 1 && <p style={{ textAlign: 'center', color: 'white'}}>Nothing added yet</p>}
            <TitlesList watchStatus={planning} />
        </>
    )
}
import { useState, useEffect } from "react";
import TitlesList from "../../components/TitlesList";
import { fetchTitlesFromDatabase } from "../../services/api.js";

export default function AllTitles() {
    const [allTitles, setAllTitles] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function fetchAllTitles() {
            try {
                const response = await fetchTitlesFromDatabase();

                if (!ignore) {
                    setAllTitles(response.titles);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchAllTitles();

        return () => {
            ignore = true;
        }
    }, [])

    return(
        <>
            {error && <p style={{ textAlign: 'center', color: 'white'}}>Error loading content</p>}
            {loading && <p style={{ textAlign: 'center', color: 'white'}}>Loading...</p>}
            {allTitles && allTitles.length < 1 && <p style={{ textAlign: 'center', color: 'white'}}>Nothing added yet</p>}
            <TitlesList watchStatus={allTitles} />
        </>
    )
}
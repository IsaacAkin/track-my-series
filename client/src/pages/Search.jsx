import Navbar from "../components/Navbar.jsx";
import { useSearchParams, NavLink } from "react-router";
import { useState, useEffect } from "react";

function ResultsList({ watchStatus }) {
    return (
        <div className="container">
            <div className="results-list">
                {
                    watchStatus && (
                        watchStatus.map(title => (
                            <div key={title.id} className="card">
                                <div className="image-container">
                                    <img src={title.thumbnail} alt={title.name} className="thumbnail" />
                                </div>
                                <div className="tect-container">
                                    <NavLink to={`/title/${title.id}`}>
                                        <p className="primary-title">{title.title}</p>
                                    </NavLink>
                                    <div className="format">
                                        <p className="type">{title.type}</p>
                                        <p className="start-year">{title.startYear}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTitle() {
            try {
                if (!searchParams) {
                    setResults([]);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_EXTERNAL_API_URL}/search/titles?query=${encodeURIComponent(searchParams)}`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }

                const data = await response.json();
                const results = data.titles.map(series => ({
                    id: series.id,
                    title: series.primaryTitle,
                    originalTitle: series.originalTitle,
                    type: series.type,
                    rating: series.rating?.aggregateRating ?? 'N/A',
                    thumbnail: series.primaryImage?.url || ''
                }));

                setResults(results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchTitle();
    }, [searchParams])

    return(
        <div className="app">
            <Navbar />
            <h1>Search</h1>
            <input type="text" onBlur={(e) => setSearchParams(e.target.value)}/>
            {error && <p style={{ textAlign: 'center', color: 'white'}}>Error loading content</p>}
            {loading && <p style={{ textAlign: 'center', color: 'white'}}>Loading...</p>}
            {!searchParams && <p>Enter a title</p>}
            {
                searchParams && (
                    <ResultsList watchStatus={results} />
                )
            }
        </div>
    )
}
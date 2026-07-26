import Navbar from "../components/Navbar.jsx";
import { NavLink, useSearchParams } from "react-router";
import { useLoaderData } from "react-router";

function HasResults({ results, searchParams }) {
    return(
        <>
            {
                results.length >= 1 && (
                    <div className="app">
                        <Navbar />
                        <h1 style={{ textAlign: 'center', color: 'white'}}>Search</h1>
                        <div className="container">
                            <div className="results-list">
                                { <p style={{ color: 'white', fontSize: '30px' }}>{results.length} items found for "{searchParams}":</p> }
                                {
                                    results.map(title => (
                                        <div key={title.id} className="card">
                                            <div className="image-container">
                                                <img src={title.poster_src} alt={title.title} className="thumbnail" />
                                            </div>
                                            <div className="text-container">
                                                <NavLink to={`/title/${title.media_type}/${title.id}`}>
                                                    <p className="primary-title">{title.title}</p>
                                                    {title.title !== title.original_title && <p className="secondary-title">{title.original_title}</p>}
                                                </NavLink>
                                                <div className="format">
                                                    <p className="type">{title.media_type}</p>
                                                    <p className="air-date">{title.start_date !== 'N/A' && title.start_date}</p>
                                                    <p className="release-date">{title.release_date !== 'N/A' && title.release_date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

function HasNoResults({ results, searchParams }) {
    return(
        <>
            {
                results.length < 1 && (
                    <div className="app">
                        <Navbar />
                        <h1 style={{ textAlign: 'center', color: 'white'}}>Search</h1>
                        <div className="container">
                            <div className="results-list">
                                { <p style={{ color: 'white', fontSize: '30px' }}>{results.length} results found for '{searchParams}'</p> }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default function Search() {
    const { results } = useLoaderData();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    return(
        <>
            <HasNoResults results={results} searchParams={searchTerm} />
            <HasResults results={results} searchParams={searchTerm} />
        </>
    )
}
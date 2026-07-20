import Navbar from "../components/Navbar.jsx";
import { NavLink } from "react-router";
import { useLoaderData } from "react-router";

function HasResults({ results }) {
    return(
        <>
            {
                results.length >= 1 && (
                    <div className="app">
                        <Navbar />
                        <h1 style={{ textAlign: 'center', color: 'white'}}>Search</h1>
                        <div className="container">
                            <div className="results-list">
                                { <p style={{ color: 'white', fontSize: '30px' }}>{results.length} items found:</p> }
                                {
                                    results.map(title => (
                                        <div key={title.id} className="card">
                                            <div className="image-container">
                                                <img src={title.thumbnail} alt={title.title} className="thumbnail" />
                                            </div>
                                            <div className="tect-container">
                                                <NavLink to={`/title/${title.id}`}>
                                                    <p className="primary-title">{title.title}</p>
                                                </NavLink>
                                                <div className="format">
                                                    <p className="type">{title.type}</p>
                                                    {/* <p className="start-year">{title.startYear}</p> */}
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

function HasNoResults({ results }) {
    return(
        <>
            {
                results.length < 1 && (
                    <div className="app">
                        <Navbar />
                        <h1 style={{ textAlign: 'center', color: 'white'}}>Search</h1>
                        <div className="container">
                            <div className="results-list">
                                { <p style={{ color: 'white', fontSize: '30px' }}>{results.length} results found</p> }
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

    return(
        <>
            <HasNoResults results={results} />
            <HasResults results={results} />
        </>
    )
}
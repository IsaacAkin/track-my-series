import Navbar from "../components/Navbar.jsx";
import { NavLink } from "react-router";
import { useLoaderData } from "react-router";

export default function Search() {
    const { results } = useLoaderData();

    return(
        <div className="app">
            <Navbar />
            <h1>Search</h1>
            <div className="container">
                <div className="results-list">
                    {
                        results && (
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
                        )
                    }
                </div>
            </div>
        </div>
    )
}
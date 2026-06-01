import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchTitleInformation } from "../services/api.js";
import { AddTitleBtn, DeleteTitleBtn } from "../components/TitleButtons.jsx";

function ApiTitle({ title }) {
    return (
        <div className="container">
            <div className="title-information">
                <div className="thumbnail-container">
                    <img src={title.thumbnail} alt={title.name} className="full-thumbnail" />
                </div>
                <div className="example">
                    <div className="context">
                        <p className="primary-title">{title.title}</p>
                        {title.type === 'tvSeries' && <p className="type">TV Series</p>}
                        {title.type === 'tvMiniSeries' && <p className="type">TV Mini Series</p>}
                        {title.type === 'movie' && <p className="type">Movie</p>}
                        <p className="plot">{title.plot}</p>
                    </div>
                    <div className="status-buttons">
                        <p>Rating: {title.rating}</p>
                        <AddTitleBtn title={title} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function DatabaseTitle({ title, id }) {
    return (
        <div className="container">
            <div className="title-information">
                <div className="thumbnail-container">
                    <img src={title.thumbnail} alt={title.name} className="full-thumbnail" />
                </div>
                <div className="example">
                    <div className="context">
                        <p className="primary-title">{title.title}</p>
                        {title.type === 'tvSeries' && <p className="type">TV Series</p>}
                        {title.type === 'tvMiniSeries' && <p className="type">TV Mini Series</p>}
                        {title.type === 'movie' && <p className="type">Movie</p>}
                        <p className="plot">{title.plot}</p>
                    </div>
                    <div className="status-buttons">
                        <p>Rating: {title.rating}</p>
                        <div className="episode-handler">
                            <span id="total_episodes">{title.seasons[0].total_episodes}</span>
                            <span>/</span>
                            <span id="watched_episodes">{title.seasons[0].watched_episodes}</span>
                        </div>
                        <DeleteTitleBtn id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Title() {
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getTitle() {
            try {
                const data = await fetchTitleInformation(id);
                setTitle(data.title);   
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        getTitle();
    }, [id])

    return(
        <div className="app">
            <Navbar />
            <>
                {error && <p style={{ textAlign: 'center', color: 'white'}}>Error loading content</p>}
                {loading && <p style={{ textAlign: 'center', color: 'white'}}>Loading...</p>}
                {title && title.id && <ApiTitle title={title} /> }
                {title && title._id && <DatabaseTitle title={title} id={id} /> }
            </>
        </div>
    )
}
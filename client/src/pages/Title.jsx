import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import { useLoaderData } from "react-router";
import AddTitleButton from "../components/title/AddTitleButton.jsx"
import StatusDropdown from "../components/title/StatusDropdown.jsx";
import DeleteTitleButton from "../components/title/DeleteTitleButton.jsx"
import RatingDropdown from "../components/title/RatingDropdown.jsx"
import SeasonsDropdown from "../components/title/SeasonsDropdown.jsx"

function ApiTitle({ title, setTitle }) {
    return (
        <div className="container">
            <div className="title-information">
                <div className="thumbnail-container">
                    <img src={title.poster_src} alt={title.title} className="full-thumbnail" />
                </div>
                <div className="example">
                    <div className="context">
                        <p className="primary-title">{title.title}</p>
                        {title.media_type === 'tv' && <p className="type">TV Series</p>}
                        {title.media_type === 'movie' && <p className="type">Movie</p>}
                        <p className="plot">{title.overview}</p>
                    </div>
                    <div className="status-buttons">
                        {/* {title.start_date !== 'N/A' && <p>{title.start_date}</p>} */}
                        {/* {title.end_date !== 'N/A' && <p>{title.end_date}</p>} */}
                        {/* {title.release_date !== 'N/A' && <p>{title.release_date}</p>} */}
                        {title.media_type === 'tv' && <p>{title.seasons.length} seasons</p>}
                        <p>Rating: {title.rating}</p>
                        <AddTitleButton title={title} setTitle={setTitle} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function DatabaseTitle({ title, setTitle }) {
    return (
        <div className="container">
            <div className="title-information">
                <div className="thumbnail-container">
                    <img src={title.poster_src} alt={title.title} className="full-thumbnail" />
                </div>
                <div className="example">
                    <div className="context">
                        <p className="primary-title">{title.title}</p>
                        {title.media_type === 'tv' && <p className="type">TV Series</p>}
                        {title.media_type === 'movie' && <p className="type">Movie</p>}
                        <p className="plot">{title.overview}</p>
                    </div>
                    <div className="status-buttons">
                        <p>Rating: {title.rating}</p>
                        <StatusDropdown title={title} />
                        <RatingDropdown title={title} />
                        <SeasonsDropdown title={title} />
                        <DeleteTitleButton title={title} setTitle={setTitle} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Title() {
    const { title } = useLoaderData();
    const [currentTitle, setCurrentTitle] = useState(title?._id ? title : null);

    return(
        <div className="app">
            <Navbar />
            {
                currentTitle !== null ? (
                    <DatabaseTitle title={currentTitle} setTitle={setCurrentTitle} /> // renders a title that is already in or was just added to the database
                ) : (
                    <ApiTitle title={title} setTitle={setCurrentTitle} /> // renders a title fetched from the external API
                )
            }
        </div>
    )
}
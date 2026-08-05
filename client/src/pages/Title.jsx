import Navbar from "../components/Navbar.jsx";
import { useLoaderData } from "react-router";
import { AddTitleBtn, UpdateStatusBtn, DeleteTitleBtn, SetTitleRating } from "../components/TitleButtons.jsx";

function ApiTitle({ title }) {
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
                        {title.seasons !== 'N/A' && <p>{title.seasons.length} seasons</p>}
                        <p>Rating: {title.rating}</p>
                        <AddTitleBtn title={title} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function DatabaseTitle({ title }) {
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
                        <div className="episode-handler">
                            {
                                title.media_type == 'tv' &&
                                <>
                                    <span id="total_episodes">{title.seasons[0].episode_count}</span>
                                    <span>/</span>
                                    <span id="watched_episodes">{title.seasons[0].watched_count}</span>
                                </>
                            }
                        </div>
                        <UpdateStatusBtn title={title} />
                        <SetTitleRating title={title} />
                        <DeleteTitleBtn id={title._id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Title() {
    const { title } = useLoaderData()

    return(
        <div className="app">
            <Navbar />
            <>
                {title && title.id && <ApiTitle title={title} /> }
                {title && title._id && <DatabaseTitle title={title} /> }
            </>
        </div>
    )
}
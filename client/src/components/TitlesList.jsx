import { NavLink } from "react-router";

export default function TitlesList({ titles }) {
    return (
        <div className="container">
            <div className="results-list">
                {
                    titles && titles.map(title => (
                        <div key={title._id} className="card">
                            <div className="image-container">
                                <img src={title.poster_src} alt={title.title} className="thumbnail" />
                            </div>
                            <div className="text-container">
                                <NavLink to={`/title/${title.media_type}/${title._id}`}>
                                    <p className="primary-title">{title.title}</p>
                                </NavLink>
                                <div className="format">
                                    <p className="type">{title.media_type}</p>
                                    <p className="start-year">{title.start_date}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
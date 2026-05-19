import { NavLink } from "react-router";

export default function TitlesList({ watchStatus }) {
    return (
        <div className="container">
            <div className="results-list">
                {
                    watchStatus && (
                        watchStatus.map(title => (
                            <div key={title._id} className="card">
                                <div className="image-container">
                                    <img src={title.thumbnail} alt={title.name} className="thumbnail" />
                                </div>
                                <div className="tect-container">
                                    <NavLink to={`/title/${title._id}`}>
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
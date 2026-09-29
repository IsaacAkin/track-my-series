import { useState } from "react";
import TvEpisodeHandler from "./TvEpisodeHandler.jsx";
import MovieEpisodeHandler from "./MovieEpisodeHandler.jsx";

export default function SeasonsDropdown({ title }) {
    const seasons = title.seasons;
    const [currentSeason, setCurrentSeason] = useState(title.media_type == 'tv' && title.seasons[0].season_number);
    const [episodeCount, setEpisodeCount] = useState(title.media_type == 'tv' ? title.seasons[0].episode_count : 1);
    const [watchedCount, setWatchedCount] = useState(title.media_type == 'tv' ? (title.seasons[0].watched_count ?? 0) : (title.watched == false ? 0 : 1));

    const fetchSeasonInformation = async (e) => {
        // updates the seasons watched episode count to the latest version upon selecting a different season
        const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${title.media_type}/${title._id}`);

        if (!response.ok) {
            throw new Error('Unable to fetch season information');
        }

        const data = await response.json();
        const seasonInfo = data.title.seasons.find(season => season.season_number === Number(e.target.value));

        if (!seasonInfo) throw new Error("Season information not found");

        setCurrentSeason(seasonInfo.season_number);
        setEpisodeCount(seasonInfo.episode_count);
        setWatchedCount(seasonInfo.watched_count ?? 0);
    }

    return (
        <>
            {
                title.media_type === 'tv' &&
                <>
                    <select name="seasons-dropdown" id="seasons-dropdown" defaultValue={currentSeason} onChange={fetchSeasonInformation}>
                        {
                            seasons.map(season => (
                                <option key={season.season_number} value={season.season_number}>Season {season.season_number}</option>
                            ))
                        }
                    </select>
                    <TvEpisodeHandler title={title} currentSeason={currentSeason} episodeCount={episodeCount} watchedCount={watchedCount} updateWatchedCount={setWatchedCount} />
                </>
            }
            {
                title.media_type === 'movie' &&
                <MovieEpisodeHandler title={title} watchedCount={watchedCount} updateWatchedCount={setWatchedCount} />
            }  
        </>
    )
}
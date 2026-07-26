import 'dotenv/config.js';

/** returns an array of tv series and or movies from the TMDB database that match the search query */
export async function getListOfSeries(req, res) {
    try {
        const { searchTerm } = req.query;
    
        if (!searchTerm) {
            return res.json({ searchTerm: '', results: [] });
        }
        
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-GB&page=1`, 
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`
                }
            });
        if (!response.ok) {
            return res.status(502).json({ message: 'Search service temporarily unavailable.' });
        }
        
        // As the request also factors in people, the returned information needs to exclude them
        const data = await response.json();
        const results = data.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie')
        .map(item => ({
            id: item.id,
            title: item.media_type === 'tv' ? item.name : item.title,
            original_title: item.media_type === 'tv'
                ? item.original_name
                : item.original_title,
            media_type: item.media_type,
            start_date: item.first_air_date || 'N/A',
            release_date: item.release_date || 'N/A',
            rating: item.vote_average ?? 'N/A',
            poster_src: 'https://image.tmdb.org/t/p/w500/' + item.poster_path || '',
        }));
        
        res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

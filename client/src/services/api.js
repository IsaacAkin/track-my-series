// GET gets a single titles information from either the API or database
export const fetchTitleInformation = async ({ request }) => {
    const url = new URL(request.url);
    const id = url.pathname.split('/').at(-1);
    const mediaType = url.pathname.split('/').at(-2);

    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${mediaType}/${id}`);
    const response = await fetch(`api/title/${mediaType}/${id}`);

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// GET gets search results from the api
export async function fetchTitlesFromApi({ request }) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm');

    if (!searchTerm) return { results: [] };

    // const response = await fetch(`${import.meta.env.VITE_API_URL}/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    const response = await fetch(`api/search?searchTerm=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// GET gets a list of titles from the database depending on the watch_status
export const fetchTitlesFromDatabase = async ({ request }) => {
    const url = new URL(request.url);
    const watchStatus = url.pathname.split('/').at(-1);
    let response;

    // if (watchStatus != 'watchlist' && !watchStatus) return { results: [] };

    if (watchStatus == 'watchlist') {
        // response = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`);
        response = await fetch(`api/watchlist`);
    } else {
        // response = await fetch(`${import.meta.env.VITE_API_URL}/watchlist/${watchStatus}`);
        response = await fetch(`api/watchlist/${watchStatus}`);
    }

    if (!response) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// POST adds title information to the database
export const addToDatabase = async (title, watchStatus) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${title.media_type}/${title.id}`, {
    const response = await fetch(`api/title/${title.media_type}/${title.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ...title, 
            watchStatus
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// PATCH
export const updateTitleRating = async (id, mediaType, newRating) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${mediaType}/${id}/rating`, {
    const response = await fetch(`api/title/${mediaType}/${id}/rating`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newRating })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// PATCH
export const updateTitleWatchStatus = async (id, mediaType, newStatus) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${mediaType}/${id}/status`, {
    const response = await fetch(`api/title/${mediaType}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStatus })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// PATCH updates a tv series watched count
export const updateTvWatchedCount = async (id, mediaType, seasonNumber, watchedCount, episodeCount) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${mediaType}/${id}/episodecount`, {
    const response = await fetch(`api/title/${mediaType}/${id}/episodecount`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            seasonNumber,
            watchedCount,
            episodeCount
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// PATCH updates a movies watched count
export const updateMovieWatchedCount = async (id, mediaType, watchedCount) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${mediaType}/${id}/episodecount`, {
    const response = await fetch(`api/title/${mediaType}/${id}/episodecount`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            watchedCount
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// DELETE
export const removeTitleFromDatabase = async (id, mediaType) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${mediaType}/${id}`, {
    const response = await fetch(`api/title/${mediaType}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}
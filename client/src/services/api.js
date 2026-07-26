// GET
export const fetchTitleInformation = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${id}`);

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

    const response = await fetch(`${import.meta.env.VITE_API_URL}/search?searchTerm=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// GET
export const fetchTitlesFromDatabase = async (watchStatus) => {
    let response;

    if (!watchStatus) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`);
    } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/watchlist/${watchStatus}`);
    }

    if (!response) {
        // throw new Error(`Error ${response.status}`);
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// POST
export const addToDatabase = async (title, watchStatus) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${title.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ...title, 
            status: watchStatus
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// PATCH
export const updateTitleRating = async (id, newRating) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/rating/${id}`, {
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
export const updateTitleWatchStatus = async (id, newStatus) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/status/${id}`, {
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

// PATCH
export const updateTitleEpisodeCount = async (id, titleType, seasonNumber, episodeCount, maxEpisodes) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/episodecount/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titleType,
            seasonNumber,
            episodeCount,
            maxEpisodes
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}

// DELETE
export const removeTitleFromDatabase = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
}
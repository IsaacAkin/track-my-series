// GET
export const fetchTitleInformation = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${id}`);

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
export const addToDatabase = async (title) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/title/${title.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(title)
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
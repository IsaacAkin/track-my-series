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
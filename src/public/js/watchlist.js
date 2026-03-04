const statusDropdown = document.querySelector('#status');
const ratingDropdown = document.querySelector('#rating');
const deleteBtn = document.querySelector('.delete-btn');

/** sends the post request to the server with the new status information */
const updateCollection = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;
    const newStatus = statusDropdown.value;

    const payload = { newStatus };

    try {
        const response = await fetch(`/watchlist/:status/${titleId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response.status}`);
        }

        console.log('Successfully sent title information to the server');
    } catch (error) {
        console.error(error);
    } finally {
        statusDropdown.disabled = false;
    }
}

/** sends the post request to the server with the new status information */
const updateRating = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;
    const status = statusDropdown.value;
    const newRating = ratingDropdown.value;

    const payload = { newRating };

    try {
        const response = await fetch(`/watchlist/${status}/${titleId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response.status}`);
        }

        console.log('Successfully sent title information to the server');
    } catch (error) {
        console.error(error);
    } finally {
        ratingDropdown.disabled = false;
    }
}

const deleteFromCollection = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;

    try {
        const response = await fetch(`/watchlist/:status/${titleId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response.status}`);
        }

        console.log('Successfully sent title information to the server.');
    } catch (error) {
        console.error(error);
    } finally {
        deleteBtn.disabled = false;
    }
}

statusDropdown.addEventListener('change', async () => {
    statusDropdown.disabled = true;
    await updateCollection();
});

ratingDropdown.addEventListener('change', async () => {
    ratingDropdown.disabled = true;
    await updateRating();
});

deleteBtn.addEventListener('click', async () => {
    deleteBtn.disabled = true;
    await deleteFromCollection();
});
const statusDropdown = document.querySelector('#status');
const ratingDropdown = document.querySelector('#rating');
const deleteBtn = document.querySelector('.delete-btn');
const dialog = document.querySelector('.successfully-deleted');
const closeBtn = document.querySelector('.successfully-deleted > button');

/** sends the post request to the server with the new status information */
const updateStatus = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;
    const newStatus = statusDropdown.value;

    const payload = { newStatus };

    try {
        const response = await fetch(`/watchlist/${titleId}/newstatus`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error(error);
    } finally {
        statusDropdown.disabled = false;
    }
}

/** sends the post request to the server with the new status information */
const updateRating = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;
    const newRating = ratingDropdown.value;

    const payload = { newRating };

    try {
        const response = await fetch(`/watchlist/${titleId}/newrating`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error(error);
    } finally {
        ratingDropdown.disabled = false;
    }
}

const deleteFromCollection = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;

    try {
        const response = await fetch(`/watchlist/${titleId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
        dialog.showModal();
    } catch (error) {
        console.error(error);
    }
}

statusDropdown.addEventListener('change', async () => {
    statusDropdown.disabled = true;
    await updateStatus();
});

ratingDropdown.addEventListener('change', async () => {
    ratingDropdown.disabled = true;
    await updateRating();
});

deleteBtn.addEventListener('click', async () => {
    deleteBtn.disabled = true;
    statusDropdown.disabled = true;
    ratingDropdown.disabled = true;
    await deleteFromCollection();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
})
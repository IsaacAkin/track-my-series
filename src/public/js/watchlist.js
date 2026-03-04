const dropdown = document.querySelector('#status');
const deleteBtn = document.querySelector('.delete-btn');

/** sends the post reequest to the server with the new status information */
const updateCollection = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;
    const newStatus = dropdown.value;

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
        dropdown.disabled = false;
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

dropdown.addEventListener('change', async () => {
    dropdown.disabled = true;
    await updateCollection();
});

deleteBtn.addEventListener('click', async () => {
    deleteBtn.disabled = true;
    await deleteFromCollection();
});
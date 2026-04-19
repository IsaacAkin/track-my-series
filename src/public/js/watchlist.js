const statusDropdown = document.querySelector('#status');
const ratingDropdown = document.querySelector('#rating');
const deleteBtn = document.querySelector('.delete-btn');
const confirmDeleteDialog = document.querySelector('.confirm-deletion');
const noDeleteBtn = document.querySelector('.no-delete');
const yesDeleteBtn = document.querySelector('.yes-delete');
const successDialog = document.querySelector('.successfully-deleted');
const closeBtn = document.querySelector('.successfully-deleted > button');
const seasonsDropdown = document.querySelector('#seasons');
const totalEpisodes = document.querySelector('#total_episodes');
const watchedEpisodes = document.querySelector('#watched_episodes');
const invalidNumber = document.querySelector('.invalid-number');
const incrementBtn = document.querySelector('.increment-btn');
const decrementBtn = document.querySelector('.decrement-btn');

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
        enableElements();
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
        enableElements();
    }
}

const updateEpisodeCount = async () => {
    const titleId = document.querySelector('.title-information').dataset.id;
    const titleType = document.querySelector('.type').textContent.toLowerCase();
    const seasonNumber = Number(seasonsDropdown.value);
    const maxEpisodes = Number(totalEpisodes.value);
    const episodeCount = Number(watchedEpisodes.value);

    const payload = {
        titleType,
        seasonNumber,
        episodeCount,
        maxEpisodes
    };

    try {
        const response = await fetch(`/watchlist/${titleId}/incrementEpisode`, {
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
        console.error(error)
    } finally {
        enableElements();
    }
}

const changeEpisodeCount = async (e) => {
    disableElements();

    const maxEpisodes = Number(totalEpisodes.value);
    const episodeCount = Number(e.target.value);

    if (episodeCount > maxEpisodes || episodeCount < 0 || isNaN(episodeCount)) {
        invalidNumber.textContent = 'Invalid number';
        enableElements();
        return;
    }

    watchedEpisodes.value = episodeCount;
    await updateEpisodeCount();
    isValidNumber();
}

const isValidIncrement = async () => {
    disableElements();

    const maxEpisodes = Number(totalEpisodes.value);
    const episodeCount = Number(watchedEpisodes.value);

    if (episodeCount + 1 > maxEpisodes) {
        invalidNumber.textContent = 'Invalid number';
        enableElements();
        return;
    }

    watchedEpisodes.value = episodeCount + 1;
    await updateEpisodeCount();
    isValidNumber();
}

const isValidDecrement = async () => {
    disableElements();

    const episodeCount = Number(watchedEpisodes.value);

    if (episodeCount - 1 < 0) {
        invalidNumber.textContent = 'Invalid number';
        enableElements();
        return;
    }

    watchedEpisodes.value = episodeCount - 1;
    await updateEpisodeCount();
    isValidNumber();
}

const isValidNumber = () => {
    const maxEpisodes = Number(totalEpisodes.value);
    const episodeCount = Number(watchedEpisodes.value);

    if (episodeCount === maxEpisodes || episodeCount >= 0) {
        invalidNumber.textContent = '';
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
        successDialog.showModal();
    } catch (error) {
        console.error(error);
    }
}

const disableElements = () => {
    statusDropdown.disabled = true;
    ratingDropdown.disabled = true;
    seasonsDropdown.disabled = true;
    totalEpisodes.disabled = true;
    watchedEpisodes.disabled = true;
    incrementBtn.disabled = true;
    decrementBtn.disabled = true;
    deleteBtn.disabled = true;
}

const enableElements = () => {
    statusDropdown.disabled = false;
    ratingDropdown.disabled = false;
    seasonsDropdown.disabled = false;
    totalEpisodes.disabled = false;
    watchedEpisodes.disabled = false;
    incrementBtn.disabled = false;
    decrementBtn.disabled = false;
    deleteBtn.disabled = false;
}

statusDropdown.addEventListener('change', async () => {
    disableElements();
    await updateStatus();
});

ratingDropdown.addEventListener('change', async () => {
    disableElements();
    await updateRating();
});

deleteBtn.addEventListener('click', () => {
    confirmDeleteDialog.showModal();
});

noDeleteBtn.addEventListener('click', () => {
    confirmDeleteDialog.close();
});

yesDeleteBtn.addEventListener('click', async () => {
    disableElements();
    confirmDeleteDialog.close();
    await deleteFromCollection();
});

closeBtn.addEventListener('click', () => {
    successDialog.close();
});

seasonsDropdown.addEventListener('change', () => {
    const selectedSeason = Number(seasonsDropdown.value);
    const foundSeason = seasons.find(seasonNumber => seasonNumber.season === selectedSeason);
    if (foundSeason) {
        invalidNumber.textContent = '';
        totalEpisodes.value = foundSeason.total_episodes;
        watchedEpisodes.value = foundSeason.watched_episodes;
    }
});

watchedEpisodes.addEventListener('change', (e) => {
    changeEpisodeCount(e);
});

incrementBtn.addEventListener('click', () => {
    isValidIncrement();
});

decrementBtn.addEventListener('click', () => {
    isValidDecrement();
});
const button = document.querySelector('.submit-btn');
const dialog = document.querySelector('.title-added');
const closeBtn = document.querySelector('.title-added > button');

async function addToWatchlist() {
    const id = document.querySelector('.title-information').dataset.id;
    const title = document.querySelector('.primary-title').textContent;
    const type = document.querySelector('.type').textContent;
    const startYear = document.querySelector('.start-year').textContent;
    const endYear = document.querySelector('.end-year').textContent;
    const plot = document.querySelector('.plot').textContent;
    const thumbnail = document.querySelector('.thumbnail').src;

    const payload = {
        id,
        title,
        type,
        startYear,
        endYear,
        plot,
        thumbnail
    }

    console.log('Payload:', payload);

    try {
        const response = await fetch('/title/:id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send title information to the server: ${response}`);    
        }

        console.log(`Successfully sent information on '${title}' to the server.`);
        dialog.showModal();
    } catch (error) {
        console.error(`Failed to send title information to the server: ${error}`);
    }
}

button.addEventListener('click', async () => {
    button.disabled = true;
    await addToWatchlist();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});
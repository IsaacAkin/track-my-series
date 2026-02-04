const el = {};

/** returns an array of titles from the imbd database that match the search query */
const getMovies = async () => {
    try {
        const params = el.searchBar.value.trim();
        if (!params) {
            alert('Please enter a valid search term')
        }
        
        const response = await fetch(`https://api.imdbapi.dev/search/titles?query=${params}`);
        const searchResult = await response.json();
        console.log(searchResult.titles);

        return searchResult.titles;
    } catch (error) {
        console.error('Error', error);
        alert('Error');
    }
}

// displays all results from the search
const displayMovies = async () => {
    try {
        const response = await getMovies();
        if (!response) return;

         response.forEach(movie => {
            const div = document.createElement('div');
            const title = document.createElement('p');
            const originalTitle = document.createElement('p');
            const type = document.createElement('p');
            const rating = document.createElement('p');
            const thumbnail = document.createElement('img');

            div.dataset.id = movie.id;
            title.textContent = movie.primaryTitle;
            originalTitle.textContent = movie.originalTitle;
            type.textContent = movie.type;
            rating.textContent = movie.rating?.aggregateRating ?? 'N/A';
            thumbnail.src = movie.primaryImage?.url || '';
            thumbnail.style.width = '160px';
            thumbnail.style.height = '270px';

            div.appendChild(title);
            div.appendChild(originalTitle);
            div.appendChild(type);
            div.appendChild(rating);
            div.appendChild(thumbnail);

            el.displayResults.appendChild(div);
        });
    } catch (error) {
        console.error('An error happened', error);
    }
}

function checkKeys(e) {
    if (e.key === 'Enter') {
        el.displayResults.textContent = '';
        displayMovies()
    }
}

function prepareVariables() {
    el.searchBar = document.querySelector('.search-bar');
    el.btn = document.querySelector('.btn');
    el.displayResults = document.querySelector('.results');
    el.seriesTitle = document.querySelector('.title');
}

function prepareEventListeners() {
    el.btn.addEventListener('click', () => {
        el.displayResults.textContent = '';
        displayMovies();
    });

    el.searchBar.addEventListener('keyup', checkKeys);
}

prepareVariables();
prepareEventListeners();
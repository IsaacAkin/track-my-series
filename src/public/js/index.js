const el = {};

/** returns information from a specific title */
const getTitle = async (titleId) => {
    try {
        const params = titleId
        if (!params) { return };

        const response = await fetch(`https://api.imdbapi.dev/titles/${params}`)
        if (!response.ok) {
            throw new Error("Problem fetching title information");
        }

        const searchResult = await response.json();
        const data = {
            title: searchResult.primaryTitle,
            type: searchResult.type,
            startYear: searchResult.startYear,
            endYear: searchResult.endYear,
            genres: searchResult.genres,
            rating: searchResult.rating?.aggregateRating ?? 'N/A',
            plot: searchResult.plot,
            thumbnail: searchResult.primaryImage?.url || ''
        }

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// displays information from a specific title
const displayTitle = async (id) => {
    try {
        const response = await getTitle(id);
        if (!response) { return };

        el.title.textContent = response.title;
        el.type.textContent = response.type;
        el.startYear.textContent = response.startYear;
        el.endYear.textContent = response.endYear;
        // el.genres.textContent = 
        el.rating.textContent = response.rating;
        el.plot.textContent = response.plot;
        el.thumbnail.src = response.thumbnail;
        
    } catch (error) {
        console.error('An error occured', error);
    }
}

function prepareVariables() {
    el.title = document.querySelector('.title');
    el.type = document.querySelector('.type');
    el.startYear = document.querySelector('.start-year');
    el.endYear = document.querySelector('.end-year');
    // el.genres = document.querySelector('.genres');
    el.rating = document.querySelector('.rating');
    el.plot = document.querySelector('.plot');
    el.thumbnail = document.querySelector('.thumbnail');
}

prepareVariables();
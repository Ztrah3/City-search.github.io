import cityApiKey from "./apikey.mjs"

const COUNTRY = 'US';
const API_KEY = cityApiKey;
const LIMIT = 30;
let pageNum = 1;


document.getElementById('city-form').addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault();
    const cityName = document.getElementById('search-city').value;
    getCities(cityName);
}


function getCities(cityName) {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/city?limit=${LIMIT}&name=${cityName}`,
        headers: { 'X-Api-Key': API_KEY },
        contentType: 'application/json',
        success: handleSuccess,
        error: handleError
    });
}


function handleSuccess(result) {
    const cityList = document.getElementById('city-list');
    while (cityList.firstChild) {
        cityList.removeChild(cityList.firstChild);
    }
    result.forEach(city => {
        const listItem = createListItem(`Country: ${city.country}, City: ${city.name}, Population: ${city.population}`);
        cityList.appendChild(listItem);
    });
}

function createHeading(text, headingType, id) {
    const heading = document.createElement(headingType);
    heading.textContent = text;
    heading.id = id;
    return heading;
}

function handleError(jqXHR) {
    const errorMessage = 'An error occurred while fetching the cities. Please try again.';
    const errorItem = createHeading(errorMessage, 'h1', 'error-heading');
    const cityList = document.getElementById('city-list');

    // Clear the previous results and error messages
    while (cityList.firstChild) {
        cityList.removeChild(cityList.firstChild);
    }

    cityList.appendChild(errorItem);
}


function createListItem(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    listItem.id = 'listItem';
    return listItem;
}



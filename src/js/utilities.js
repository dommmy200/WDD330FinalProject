// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get URL parameters
export function getParams(param) {
  const queryString = window.location.search; // Get the query string from the URL
  const urlParams = new URLSearchParams(queryString); // Create a URLSearchParams object
  return urlParams.get(param); // Return the parameter value
}


fetch(`https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=1676161&locale=en-gb`, {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'booking-com.p.rapidapi.com'
  }
})
.then(response => response.json()) // Parse JSON response
.then(data => console.log(data))
.catch(error => console.error('Error fetching data:', error));

const axios = require('axios');

const mockarooApiKey = 'c8273bc0'; // API key
const mockarooUrl = 'https://api.mockaroo.com/api/v1/download?key=mockarooApiKey&count=100&format=json&fields=hotelId,name,location,amenities,rooms,image'; // Replace with the URL of your Mockaroo dataset

axios.get(mockarooUrl)
  .then(response => {
    const hotelData = response.data;
    console.log(hotelData);
    // Process the hotel data as needed
  })
  .catch(error => {
    console.error('Error fetching hotel data:', error);
  });

function initializeHomePage() {
  const root = document.getElementsByName('body');
  const h1 = document.createElement('h1');
  h1.textContent("Go to Home Page.");
  const anchor = document.createElement('a');
  anchor.href = "./src/index.html";
  anchor.appendChild(h1);
  root.appendChild(anchor);
}
initializeHomePage();


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

const apiKey = '5da6d7f6efmsh009188dc742150fp1b8341jsn543dea9be0a9'; // Replace with your actual key

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


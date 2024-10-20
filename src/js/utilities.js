
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


function initializeHomePage() {
  const root = document.getElementsByName('body');
  const h1 = document.createElement('h1');
  h1.textContent("Go to Home Page.");
  const anchor = document.createElement('a');
  anchor.href = "./src/index.html";
  anchor.appendChild(h1);
  root.appendChild(anchor);
}

export function submitForm() {
  // Handle form submission
  document.getElementById('hotelSearchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedHotel = document.getElementById('hotel').value;
    if (selectedHotel) {
      // Redirect to another page and pass the selected hotel ID as a query parameter
      window.location.href = `/booking-confirmation/index.html?hotelId=${selectedHotel}`;
    } else {
      alert('Please select a hotel!');
    }
  });
}

initializeHomePage();
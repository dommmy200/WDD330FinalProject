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

export const fetchHotelsData = async () => {
  const apiKey = "c8273bc0";
  const url = `https://my.api.mockaroo.com/wdd330finalproject.json?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

    const hotels = await response.json();
    const hotelList = document.getElementById('hotel-list');

    hotels.forEach(hotel => {
      const hotelInfo = document.createElement('div');
      hotelInfo.innerHTML = `
        <h2>${hotel.hotel_name} (${hotel.star_rating}⭐)</h2>
        <img src="${hotel.hotel_image}" alt="${hotel.hotel_name}" width="600" />
        <p><strong>City:</strong> ${hotel.city}</p>
        <p><strong>Address:</strong> ${hotel.address}</p>
        <p><strong>Check-in:</strong> ${hotel.check_in}</p>
        <p><strong>Check-out:</strong> ${hotel.check_out}</p>
        <p><strong>Amenities:</strong> ${hotel.amenities}</p>
        <p><strong>Room Types:</strong> ${hotel.room_types}</p>
        <p><strong>Star Ratings:</strong> ${hotel.star_rating}</p>
        <p><strong>Price:</strong> $${hotel.price}</p>
      `;
      hotelList.appendChild(hotelInfo);
    });

  } catch (error) {
    console.error('Failed to fetch hotel data:', error);
  }
};


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


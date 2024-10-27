const apiKey = "c8273bc0";
const apiUrl = `https://api.mockaroo.com/api/53c3fbf0?count=1000&key=${apiKey}`;
const cardsUrl = `https://api.mockaroo.com/api/fbaf4390?count=1000&key=${apiKey}`;

import fs from 'fs';

function getPath(file){
  return`./src/public/${file}`;
}
// Create and store this in a json file later.
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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

// Fetch 5 random hotel entries from Mockaroo
export async function fetchMockarooData() {
  document
    .getElementById("hotelSearchForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent form from reloading the page
      // Get user input values
      const city = document
        .getElementById("city")
        .value.toLowerCase()
        .slice(0, 3);
      // const guests = document.getElementById('guests').value;
      const rating = document.getElementById("rating").value;
      const maxPrice = document.getElementById("budget").value;
      // const rooms = document.getElementById('rooms').value;
      // Get selected amenities from checkboxes
      // const amenities = document.querySelectorAll('input[name="amenities"]:checked');
      // const selectedAmenities = Array.from(amenities)
      // .map(checkbox => checkbox.value);
      // console.log("User input: Guests", guests," & Hotel Rating", rating);
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response: ", response);
        const hotels = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        if (!Array.isArray(hotels) || hotels.length === 0) {
          throw new Error("No hotel data received. Check the API response.");
        }
        const rate = Number(rating);
        const mPrice = Number(maxPrice);
        // Filter hotels based on user input
        const filteredHotels = hotels.filter((hotel) => {
          const matchesCity =
            !city || hotel.city.toLowerCase().slice(0, 3).includes(city);
          // const rooms_ = hotel.room[0].toLowerCase();
          const matchesStarRating = !rate || hotel.rating <= rate;
          const matchesPrice = !mPrice || hotel.price <= mPrice;

          return matchesStarRating && matchesPrice && matchesCity;
        });
        // Assume 'filteredHotels' is the array of hotel objects you want to display
        localStorage.setItem("filteredHotels", JSON.stringify(filteredHotels));
        window.location.href = "../search-result/results.html"; // Redirect to the new page

        // displayHotels(filteredHotels);
      } catch (error) {
        console.error("Error fetching data from Mockaroo:", error);
      }
    });
}

export async function ValidatePayments() {
  const mockedData = await loadMockedData();
  // const selectedHotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const selectedHotel = getLocalStorage("selectedHotel");

  const hotelName = selectedHotel.hotel_name;
  const hotelAmount = selectedHotel.hotel_amount;

  const cardNumber = document.getElementById("card-number").value;
  const expirationDate = document.getElementById("expiration-date").value;
  const cvv = document.getElementById("cvv").value;
  const cardType = document.getElementById("card-type").value;

  const matchedData = mockedData.find((entry) => {
    const x = entry.expiration_date;
    const y = x.split("-");
    const expiration_date = `${y[1]}/${y[0].slice(2, 4)}`;

    return (
      entry.card_number == cardNumber &&
      expiration_date == expirationDate &&
      entry.cvv == cvv &&
      entry.card_type == cardType
    );
  });
  const hotelBoolean = hotelNameAmount(hotelName, hotelAmount, selectedHotel);
  const truOrFalse = userAndMockData(matchedData, hotelBoolean);

  if (!truOrFalse) {
    alert("Unsuccessful Payment!");
    // Redirect user back to payment page (wrong approach)
    // For security reasons, may redirect user to error page.
    window.history.back();
  }
  // Successful transaction should generate a random token,
  // display it, send it to user email, inform to check email, 
  // and redirect the user to home page.
  alert("");
  window.location.href = "../index.html";
}
export async function loadMockedData() {
  const response = await fetch(cardsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
// Validate user input of hotel name and amount at payment and that selected in localStorage
function hotelNameAmount(name, amount, selected) {
  if (!name == selected.hotel_name && !amount == selected.hotel_amount) {
    return false;
  }
  return true;
}
// Validate selected hotel name and amount from localStorage, and mocked card details
function userAndMockData(fromStorage, fromCard) {
  return fromStorage && fromCard;
}


export function calcTotalAmount(checkin, checkout, price) {
  const days = getTotalDays(checkin, checkout);
  return days*price;
}
export function getTotalDays(checkin, checkout) {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const day =  24 * 60 * 60 *1000;
  const diff = Math.abs(end - start);
  const convertToDays = Math.round(diff/day);

  return convertToDays;
}
export function styleDate(date) {
  const x = Number(date.split('-')[2]);
  const y = Number(date.split('-')[1]);
  const z = Number(date.split('-')[0]);
  const b = numberToMonth(y, monthArray);
  const superTag = superScriptTag(x);
  return `${x}${superTag}${b}, ${z}`;
}
function superScriptTag(p) {
  if (p == 1) return superscriptWrap('st');
  if (p == 2) return superscriptWrap('nd');
  if (p == 3) return superscriptWrap('rd');
  return superscriptWrap('th');
}
function numberToMonth(numb, array) {
  for(let i = 0 ; i  <array.length ; i++) {
    if (numb == i) {
      return array[numb];
    }
  }
  array.forEach((month, index) => {
    if (numb == index) {
      return month;
    }
    return 'None';
  });
}
function superscriptWrap(x) {
  return `<sup>${x}</sup>`;
}
export function getAmenities(hotel) {
  const amenitiesArray = hotel.amenities;
  const container = document.createElement('p'); // Container for all spans

  amenitiesArray.forEach(amenity => {
    const span = document.createElement('span');
    span.textContent = amenity;
    span.classList.add('amenity-item'); // Optional: add a class for styling
    container.appendChild(span);
  });

  return container; // Returns the container with all spans inside


  // const amenitiesArray = hotel.amenities;
  // amenitiesArray.forEach(amenity => {
  //   const span = document.createElement('span');
  //   span.textContent = amenity;
  // });
  // return span;
}
export function properNoun(str) {
  const x = str.slice(0, 1).toUpperCase();
  const y = str.slice(1, str.length);
  return `${x}${y}`;
}
export function writeToJsonFile(file) {
  fs.readFile(getPath(file), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file: ', err);
      return;
    }
    let json;
    try{
      json = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON: ', parseErr)
      return;
    }
    fs.writeFile(getPath(file), JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file: ', writeErr);
        return;
      }
      console.log('File updated successfully!');

    })
  })
}
export function readFromJsonFile(file) {
  return JSON.parse(fs.readFileSync(getPath(file), 'utf-8'));
}
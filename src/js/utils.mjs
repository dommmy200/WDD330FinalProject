const apiKey = "c8273bc0";
export const apiUrl = `https://api.mockaroo.com/api/53c3fbf0?count=1000&key=${apiKey}`;
const cardsUrl = `https://api.mockaroo.com/api/fbaf4390?count=1000&key=${apiKey}`;

import { compareSelectCard } from './hotelCard.mjs';
// const filePath = '/json/cards.json';
// const filePath = '/json/user-profile.json';
export function getPath(file){
  return`./src/public/${file}`;
}
// This is for testing purpose: Create and store this in a json file later.
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
  document.getElementById("hotelSearchForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from reloading the page
    const hotels = fetchUrl(apiUrl);
    try {
      // Get user input values
      const city = document.getElementById("city").value.toLowerCase();
      const rating = document.getElementById("rating").value;
      const maxPrice = document.getElementById("budget").value;
      const rate = Number(rating);
      const mPrice = Number(maxPrice);
      // Filter hotels based on user input
      const filteredHotels = hotels.filter((hotel) => {
        const matchesCity =
          !city || hotel.city.toLowerCase().includes(city);
        const matchesStarRating = !rate || hotel.rating <= rate;
        const matchesPrice = !mPrice || hotel.price <= mPrice;
        if (matchesStarRating && matchesPrice && matchesCity) {
          return hotel;
        }
      });
      console.log(filteredHotels);
      // Assume 'filteredHotels' is the array of hotel objects you want to display
      localStorage.setItem("filteredHotels", JSON.stringify(filteredHotels));
      window.location.href = "../search-result/results.html"; // Redirect to the new page
    } catch (error) {
      console.error("Error of :", error);
    }
  });
}
export async function fetchUrl(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const hotels = await response.json();
        if (!Array.isArray(hotels) || hotels.length === 0) {
          throw new Error("No hotel data received. Check the API response.");
        }
    return hotels;
  } catch (error) {
    console.error("Fetching data error:", error);
  }
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
  return days * price;
}
export function getTotalDays(checkin, checkout) {
  const x = Number(checkin.split('-'));
  const y = Number(checkout.split('-'));
  return y -x;
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
export function formatCardDate(cardObj){
  return cardObj.expiration_date;
}
function numberToMonth(numb, array) {
  const numbEr = numb - 1;
  for(let i = 0 ; i  < array.length ; i++) {
    if (numbEr == i) {
      return array[numbEr];
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
}
// Function to capitalize first letter of a word
export function properNoun(str) {
  const x = str.slice(0, 1).toUpperCase();
  const y = str.slice(1, str.length);
  return `${x}${y}`;
}
export async function readCardFile() {
  try {
    const response = await fetch("/json/cards.json"); // Fetch the JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    console.log(data); // Optional: log the data
    return data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}
export async function readUserFile() {
  try {
    const response = await fetch("/json/users-profile.json"); // Fetch the JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    console.log(data); // Optional: log the data
    return data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}
// Reading from json file
export async function writeToJsonFile(cardData) {
    try {
      const response = await fetch('http://localhost:3000/update-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData), // Send the card data passed to the function
      });
  
      if (!response.ok) {
        throw new Error('Failed to add card');
      }
  
      const result = await response.text();
      console.log(result); // Optional: log the result
      return result; // Return the result if needed
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
}
// export function isCardIssued(name, data) {
//   const key = "fname";
//   const result = data.filter(item => item.person[key] === name).map(item => item.status);
//   return result;
// }
export async function isCardIssued(name) {
  try {
    const response = await fetch('/json/users-profile.json');  // Await fetch to get the response
    const data = await response.json();  // Await the response to parse JSON

    if (Array.isArray(data)) {
      const key = "fname";
      const result = data.some(item => item.person && item.person[key] === name && item.status === 'true');
      return result;
    } else {
      console.error('Expected an array for data, but received:', data);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}
// export function isCardIssued(name, data) {
//   if (!Array.isArray(data)) {
//     console.error(`Expected an array for data, but received:`, data, `Type: ${typeof data}`);
//     console.log(data);
//     return null;
//   }
//   const key = "fname";
//   return data.some(item => item.person && item.person[key] === name && item.status === 'issued');
//   // const result = data
//   //   .filter(item => item.person && item.person[key] === name)
//   //   .map(item => item.status);

//   // return result.length ? result : null; // Return null if no matches found
// }
export async function issueCreditCard(surname, profileDb) {
  const key = "lname";
  const file1 = "/json/users-profile.json";
  const file2 = "/json/cards.json";
  //return an existing card
  if (isCardIssued(surname, profileDb)) {
    const data = await readUserFile(file1);
    const result = data.filter(item => item.person[key] === surname).map(item => item.card);
    return result;
  }
  //create a new card
  const data1 = readUserFile(file1);
  const data2 = readCardFile(file2)
  
  const result1 = data1.filter(obj => obj.card && obj.card.card_number != ""); //.map(obj => obj.card[obj.card.card_number])
  const result2 = data2.filter(item => Object.prototype.hasOwnProperty.call(item, item.card).map(item => item.card_number))
  const newCard = compareSelectCard(result2, result1); //Randomly select an unused card
  return newCard;
}
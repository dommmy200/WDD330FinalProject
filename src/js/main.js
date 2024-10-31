import { fetchMockarooData } from "./utils.mjs";

console.log("Hello world!");

// export async function fetchHotels() {
//   try {
//     const response = await fetch("http://localhost:3000/hotels"); // Backend API URL
//     const hotels = await response.json();

//     const hotelList = document.getElementById("hotel-list");

//     // Populate the list with hotel data
//     hotels.forEach((hotel) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `${hotel.hotel_name} - ${hotel.city}, $${hotel.price} per night`;
//       hotelList.appendChild(listItem);
//     });
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//   }
// }
fetchMockarooData();
// initializeHomePage();

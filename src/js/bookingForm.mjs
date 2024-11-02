//import { searchHotels } from "./searchForm";
// import { populateHotels } from "./hotelStore";
// import { submitForm } from "./utils";
// import { populateHotels } from "./hotelStore";
// import { submitForm } from "./utils";

export function validateBookingForm() {
  // Check required fields
  if (
    !document.getElementById("checkInDate").value ||
    !document.getElementById("checkOutDate").value
  ) {
    alert("Please fill in all required fields.");
    return false;
  }

  // Check date format
  if (
    !isValidDate(document.getElementById("checkInDate").value) ||
    !isValidDate(document.getElementById("checkOutDate").value)
  ) {
    alert("Invalid date format.");
    return false;
  }

  // Check date range
  if (
    new Date(document.getElementById("checkInDate").value) >=
    new Date(document.getElementById("checkOutDate").value)
  ) {
    alert("Check-in date must be before check-out date.");
    return false;
  }

  // ... other validation checks

  return true;
}
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

// const hotelSearchForm = document.getElementById('hotelSearchForm');
// hotelSearchForm.addEventListener('DOMContentLoaded', (e) => {
//   e.preventDefault();
//   const amenities = document.getElementById('amenities');
//   const roomType = document.getElementById('rooms');
//   const stars = document.getElementById('rating');

//   const amenity = `<input type="checkbox" id="wifi" name="amenities" value="wifi" />
//         <label for="wifi">Wi-Fi</label><br />

//         <input type="checkbox" id="pool" name="amenities" value="pool" />
//         <label for="pool">Pool</label><br />

//         <input type="checkbox" id="gym" name="amenities" value="gym" />
//         <label for="gym">Gym</label><br />

//         <input type="checkbox" id="spa" name="amenities" value="spa" />
//         <label for="spa">Spa</label><br />

//         <input type="checkbox" id="res" name="amenities" value="res" />
//         <label for="res">Restaurant</label><br />

//         <input type="checkbox" id="bar" name="amenities" value="bar" />
//         <label for="bar">Bar</label><br />

//         <input type="checkbox" id="airport" name="amenities" value="airport" />
//         <label for="airport">Airport Shuttle</label><br />

//         <input type="checkbox" id="pet" name="amenities" value="pet" />
//         <label for="pet">Pet Friendly</label><br />

//         <input type="checkbox" id="room" name="amenities" value="room" />
//         <label for="room">Room Service</label><br />`;

//   const room = `<option value="default" selected>Choose an option</option>
//         <option value="single">Single</option>
//         <option value="double">Double</option>
//         <option value="queen">Queen</option>
//         <option value="king">King</option>
//         <option value="suite">Suite</option>`;
//   const rating = `<option value="1" >1 Star</option>
//         <option value="2">2 Stars</option>
//         <option value="3" selected>3 Stars</option>
//         <option value="4">4 Stars</option>
//         <option value="5">5 Stars</option>`;
//   amenities.innerHTML = amenity;
//   roomType.innerHTML = room;
//   stars.innerHTML = rating; 
// })

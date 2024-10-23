const apiKey = "c8273bc0";
const apiUrl = `https://api.mockaroo.com/api/53c3fbf0?count=1000&key=${apiKey}`;
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

// export function initializeHomePage() {
//   const div = document.getElementById("my-div");
//   const h1 = document.createElement("h1");
//   h1.textContent = "Go to Home Page.";
//   const anchor = document.createElement("a");
//   anchor.href = "./src/index.html";
//   anchor.appendChild(h1);
//   div.appendChild(anchor);
// }

// export function submitForm() {
//   // Handle form submission
//   document
//     .getElementById("hotelSearchForm")
//     .addEventListener("submit", (event) => {
//       event.preventDefault();
//       const selectedHotel = document.getElementById("hotel").value;
//       if (selectedHotel) {
//         // Redirect to another page and pass the selected hotel ID as a query parameter
//         window.location.href = `/booking-confirmation/confirm.html?hotelId=${selectedHotel}`;
//       } else {
//         alert("Please select a hotel!");
//       }
//     });
// }
// export function submitUserSelections() {
//   const form = document.getElementById("hotelSearchForm");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const city = document.getElementById("city").value;
//     const checkin = document.getElementById("checkin").value;
//     const checkout = document.getElementById("checkout").value;
//     const guests = document.getElementById("guests").value;
//     const budget = document.getElementById("budget").value;
//     const amenities = Array.from(
//       document.querySelectorAll("#amenities input:checked"),
//     ).map((checkbox) => checkbox.value);
//     const starRating = document.getElementById("rating").value;
//     const rooms = document.getElementById("rooms").value;
//     const request = document.getElementById("request").value;
//     // Make API call to your MongoDB backend
//     const response = await fetch("/search-hotels", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         city,
//         checkin,
//         checkout,
//         guests,
//         budget,
//         amenities,
//         starRating,
//         rooms,
//         request,
//       }),
//     });

//     const data = await response.json();

//     // Handle the response, e.g., redirect to a results page with hotel IDs
//     if (data.success) {
//       const hotelIds = data.hotelIds;
//       // Redirect to another page with hotelIds as query parameters
//       window.location.href = `/hotel-results?hotelIds=${hotelIds.join(",")}`;
//     } else {
//       // Handle errors or display a message to the user
//       console.error("Error searching for hotels:", data.error);
//     }
//   });
// }

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
        //  const guestS = Number(guests);
        // console.log("Hotels: ", hotels.slice(0, 10));
        // Filter hotels based on user input
        const filteredHotels = hotels.filter((hotel) => {
          const matchesCity =
            !city || hotel.city.toLowerCase().slice(0, 3).includes(city);
          // const rooms_ = hotel.room[0].toLowerCase();
          const matchesStarRating = !rate || hotel.rating <= rate;
          const matchesPrice = !mPrice || hotel.price <= mPrice;
          // const matchesGuests = !guestS || hotel.guest === guestS;
          // const matchesRooms = !rooms || rooms_ === rooms;
          // const matchesAmenities = selectedAmenities.every(amenity => {
          //   const hotelArray = hotel.amenities;
          //   const newAmenity = amenity.slice(0, 3);
          //   const NewHotelArray = hotelArray.map(x => x.toLowerCase().slice(0,3));
          //   return NewHotelArray.includes(newAmenity);
          // }
          // );
          // const filteredHotels = [];
          // for (let hotel of hotels.slice(0, 10)) {
          //   if (hotel.rating == rating || hotel.price <= maxPrice) {
          //     filteredHotel.push(hotel);
          //   }
          // }
          // const filteredHotels = hotels.filter(hotel => {
          //   const matchesStarRating = !rating || hotel.star_rating == rating;
          //   const matchesPrice = !maxPrice || hotel.price_per_night <= maxPrice;
          //   const matchesGuests = !guests || hotel.guests == guests;
          //   const matchesRooms = !rooms || hotel.room_types.includes(rooms);

          //   const matchesAmenities = selectedAmenities.every(amenity =>
          //     Array.isArray(hotel.amenities) && hotel.amenities.includes(amenity)
          //   );

          return (
            matchesStarRating && matchesPrice && matchesCity
            // matchesGuests &&
            // matchesRooms &&
            // matchesAmenities
          );
        });
        // console.log("Manual filtering: ", filteredHotels);
        // console.log("Filtered: ", matchesAmenities);
        // return matchesStarRating && matchesPrice && matchesGuests && matchesRooms && matchesAmenities;
        // });
        // Assume 'filteredHotels' is the array of hotel objects you want to display
        localStorage.setItem("filteredHotels", JSON.stringify(filteredHotels));
        window.location.href = "../search-result/results.html"; // Redirect to the new page

        // displayHotels(filteredHotels);
      } catch (error) {
        console.error("Error fetching data from Mockaroo:", error);
      }
    });
}
// Display the fetched data in the HTML
// function displayHotels(hotels) {
//   const hotelsDiv = document.getElementById("hotels");

//   // Slice the array to get only the first 5 hotels
//   // const firstFiveHotels = hotels.slice(0, 5);

//   hotelsDiv.innerHTML = hotels.slice(0, 5)
//     .map(
//       (hotel) => {
//         const amenities = Array.isArray(hotel.amenities
//           ? hotel.amenities.join(', ') : hotel.amenities
//           || "No amenities available!");
//         const room_types = Array.isArray(hotel.room
//           ? hotel.room.join(', ') : hotel.room
//           || "Only one available!")
//         return `
//           <div>
//             <h2>${hotel.hotel_name}</h2>
//             <img class="h-image" src="${hotel.hotel_image}" alt="${hotel.hotel_name}" loading="lazy" >
//             <p>City: ${hotel.city}</p>
//             <p>Address: ${hotel.address}</p>
//             <p>Check-in: ${hotel.check_in}</p>
//             <p>Check-out: ${hotel.check_out}</p>
//             <p>Guest: ${hotel.guest}</p>
//             <p>Amenities: ${amenities}</p>
//             <p>Room Types: ${room_types}</p>
//             <p>Star Rating: ${hotel.rating}</p>
//             <p>Price: $${hotel.price}</p>
//           </div>`;})
//         .join(', ');
// }

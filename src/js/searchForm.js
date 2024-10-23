// import { fetchHotels } from "./main";

// export function searchHotels() {
//   const formData = new FormData(document.getElementById("hotelSearchForm"));
//   const destination = formData.get("destination");
//   const checkInDate = formData.get("checkInDate");
//   const checkOutDate = formData.get("checkOutDate");
//   const numberOfGuests = formData.get("numberOfGuests");
//   const amenities = formData.getAll("amenities");

//   // Construct the query string based on search criteria
//   let queryString = `?title=${destination}&userId=${numberOfGuests}`; // Simulating hotel name and number of guests

//   // Add amenities to the query string if selected
//   if (amenities.length > 0) {
//     queryString += `&tags=${amenities.join(",")}`;
//   }

//   // Make the API request to JSONPlaceholder
//   fetch(`https://jsonplaceholder.typicode.com/posts${queryString}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Filter results based on check-in/check-out dates (you can implement more complex logic here)
//       const filteredResults = data.filter((post) => {
//         // Simulate checking if the post's content matches the destination and dates
//         return (
//           post.body.includes(destination) && // Replace with actual date comparison logic
//           post.body.includes(checkInDate) &&
//           post.body.includes(checkOutDate)
//         );
//       });

//       // Display the filtered results
//       displaySearchResults(filteredResults);
//     })
//     .catch((error) => console.error("Error fetching hotel data:", error));
// }
// function displaySearchResults(filter) {
//   const results = document.getElementById("searchRes");
//   results.textContent = filter;
// }

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve hotels from localStorage
    const hotels = JSON.parse(localStorage.getItem('filteredHotels'));
    const hotelList = document.getElementById('hotel-list');
  
    if (hotels && hotels.length > 0) {
      hotels.forEach((hotel, index) => {
        
        // Create elements to display hotel information
        const hotelDiv = document.createElement('div');
        hotelDiv.classList.add('hotel-card'); // Add CSS class for styling
  
        hotelDiv.innerHTML = `
          <h2>${hotel.hotel_name}</h2>
          <img class="h-image" src="${hotel.hotel_image}" alt="${hotel.hotel_name}" loading="lazy" >
          <p>Location: ${hotel.city}</p>
          <p>Rating: ${hotel.rating} stars</p>
          <p>Price per night: $${hotel.price}</p>
          <button class="book-hotel" data-index="${index}">Book Now</button>
        `;
        hotelList.appendChild(hotelDiv);
      });
  
      // Event listener for 'Book Now' button
      document.querySelectorAll('.book-hotel').forEach(button => {
        button.addEventListener('click', (e) => {
          const hotelIndex = e.target.dataset.index;
          // Store selected hotel in localStorage and redirect to booking page
          localStorage.setItem('selectedHotel', JSON.stringify(hotels[hotelIndex]));
          window.location.href = '../booking-confirmation/confirm.html'; // Redirect to booking page
        });
      });
    } else {
      hotelList.innerHTML = '<p>No hotels available. Please try a different search.</p>';
    }
  
    // Event listener for 'Go Back' button
    document.getElementById('go-back').addEventListener('click', () => {
      window.history.back(); // Go back to the previous page
    });
  });
  

// fetchHotels();

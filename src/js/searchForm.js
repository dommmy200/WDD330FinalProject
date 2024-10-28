document.addEventListener("DOMContentLoaded", () => {
  // Retrieve hotels from localStorage
  const hotels = JSON.parse(localStorage.getItem("filteredHotels"));
  const hotelList = document.getElementById("hotel-list");

  if (hotels && hotels.length > 0) {
    hotels.forEach((hotel, index) => {
      // Create elements to display hotel information
      const hotelDiv = document.createElement("div");
      hotelDiv.classList.add("hotel-card"); // Add CSS class for styling

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
    document.querySelectorAll(".book-hotel").forEach((button) => {
      button.addEventListener("click", (e) => {
        const hotelIndex = e.target.dataset.index;
        // Store selected hotel in localStorage and redirect to booking page
        localStorage.setItem(
          "selectedHotel",
          JSON.stringify(hotels[hotelIndex]),
        );
        window.location.href = "../booking-confirmation/confirm.html"; // Redirect to booking page
      });
    });
  } else {
    hotelList.innerHTML =
      `<p><strong>No hotels available.</strong></p>
      <p>Use a higher Rating and consider increasing Budget</p>`;
  }

  // Event listener for 'Go Back' button
  document.getElementById("go-back").addEventListener("click", () => {
    window.history.back(); // Go back to the previous page
  });
});

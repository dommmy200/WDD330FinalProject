// booking.js
document.addEventListener("DOMContentLoaded", () => {
  const selectedHotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const hotelDetailsDiv = document.getElementById("selected-hotel-details");

  if (selectedHotel) {
    hotelDetailsDiv.innerHTML = `
        <h2>${selectedHotel.hotel_name}</h2>
        <p>Location: ${selectedHotel.city}</p>
        <img class="h-image" src="${selectedHotel.hotel_image}" alt="${selectedHotel.hotel_name}" loading="lazy" >
        <p>Rating: ${selectedHotel.rating} stars</p>
        <p>Price per night: $${selectedHotel.price}</p>
      `;
  } else {
    hotelDetailsDiv.innerHTML = "<p>Error: No hotel selected.</p>";
  }

  // Event listener to go 'Back to Hotels' button
  document.getElementById("back-to-hotels").addEventListener("click", () => {
    window.location.href = "../search-result/result.html"; // Go back to selected hotels list
  });

  // Event listener for 'Confirm Booking and Redirection' button
  document.getElementById("card-issue").addEventListener("click", () => {
    alert(
      "Booking confirmed! Thank you." + "\nCheck Card Details.",
    );
    // Redirect to enter user profile
    window.location.href = "../card-services/card-issuer.html";
  });
});

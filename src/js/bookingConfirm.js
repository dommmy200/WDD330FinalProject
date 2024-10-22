// booking.js
document.addEventListener('DOMContentLoaded', () => {
    const selectedHotel = JSON.parse(localStorage.getItem('selectedHotel'));
    const hotelDetailsDiv = document.getElementById('selected-hotel-details');
  
    if (selectedHotel) {
      hotelDetailsDiv.innerHTML = `
        <h2>${selectedHotel.name}</h2>
        <p>Location: ${selectedHotel.city}</p>
        <p>Rating: ${selectedHotel.star_rating} stars</p>
        <p>Price per night: $${selectedHotel.price}</p>
      `;
    } else {
      hotelDetailsDiv.innerHTML = '<p>Error: No hotel selected.</p>';
    }
  
    // Event listener for 'Back to Hotels' button
    document.getElementById('back-to-hotels').addEventListener('click', () => {
      window.location.href = 'hotels.html'; // Go back to the hotels list
    });
  
    // Event listener for 'Confirm Booking' button
    document.getElementById('confirm-booking').addEventListener('click', () => {
      alert('Booking confirmed! Thank you.');
      // Redirect to a confirmation page or homepage
      window.location.href = '../index.html';
    });
  });
  
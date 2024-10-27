// async function fetchHotels() {
//     try {
//       const response = await fetch('http://localhost:3000/hotels');
//       const hotels = await response.json();

//       const hotelList = document.getElementById('hotel-list');
//       hotels.forEach(hotel => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${hotel.hotel_name} - ${hotel.city}, $${hotel.price} per night`;
//         hotelList.appendChild(listItem);
//       });
//     } catch (error) {
//       console.error('Error fetching hotels:', error);
//     }
//   }

//   fetchHotels(); // Fetch hotels when the page loads

async function fetchHotels() {
  try {
    console.log("1");
    const response = await fetch("http://localhost:3000/hotels");
    console.log("2");
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if the response has any content
    const text = await response.text(); // Get the response as text
    console.log("Response Text:", text); // Log the response text

    // Now parse the text as JSON
    const data = JSON.parse(text); // or await response.json() if confirmed valid
    console.log(data);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

fetchHotels();

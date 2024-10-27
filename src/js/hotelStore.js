// export async function populateHotels() {
//   try {
//     const response = await fetch("http://localhost:3000/hotels");
//     if (!response.ok) throw new Error("Failed to fetch hotels");
//     const hotels = await response.json();

//     const hotelSelect = document.getElementById("hotel");
//     hotels.forEach((hotel) => {
//       const option = document.createElement("option");
//       option.value = hotel._id;
//       option.textContent = `${hotel.name} (${hotel.city}) - ${hotel.star_rating}⭐`;
//       hotelSelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error populating hotels:", error);
//   }
// }

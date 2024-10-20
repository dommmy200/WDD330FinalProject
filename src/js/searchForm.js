import { fetchHotels } from "./main";

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
fetchHotels();

// import { fetchMockarooData } from "./utils";

// console.log("Hello world!");
// // Render the project landing page here or import rendering function
// fetchMockarooData();
const apiKey = "c8273bc0";
const apiUrl = `https://api.mockaroo.com/api/53c3fbf0?count=1000&key=${apiKey}`;


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
          // Filter hotels based on user input
          const filteredHotels = hotels.filter((hotel) => {
            const matchesCity =
              !city || hotel.city.toLowerCase().slice(0, 3).includes(city);
            // const rooms_ = hotel.room[0].toLowerCase();
            const matchesStarRating = !rate || hotel.rating <= rate;
            const matchesPrice = !mPrice || hotel.price <= mPrice;
  
            return matchesStarRating && matchesPrice && matchesCity;
          });
          // Assume 'filteredHotels' is the array of hotel objects you want to display
          localStorage.setItem("filteredHotels", JSON.stringify(filteredHotels));
          window.location.href = "../search-result/results.html"; // Redirect to the new page
  
          // displayHotels(filteredHotels);
        } catch (error) {
          console.error("Error fetching data from Mockaroo:", error);
        }
      });
  }

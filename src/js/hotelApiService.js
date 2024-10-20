import { MongoClient } from "mongodb";
import { axios } from "axios";

export const fetchHotelsData = async () => {
  const apiKey = "c8273bc0";
  const url = `https://my.api.mockaroo.com/wdd330finalproject.json?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    const hotels = await response.json();
    const hotelList = document.getElementById("hotel-list");

    hotels.forEach((hotel) => {
      const hotelInfo = document.createElement("div");
      hotelInfo.innerHTML = `
          <h2>${hotel.hotel_name} (${hotel.star_rating}⭐)</h2>
          <img src="${hotel.hotel_image}" alt="${hotel.hotel_name}" width="600" />
          <p><strong>City:</strong> ${hotel.city}</p>
          <p><strong>Address:</strong> ${hotel.address}</p>
          <p><strong>Check-in:</strong> ${hotel.check_in}</p>
          <p><strong>Check-out:</strong> ${hotel.check_out}</p>
          <p><strong>Amenities:</strong> ${hotel.amenities}</p>
          <p><strong>Room Types:</strong> ${hotel.room_types}</p>
          <p><strong>Star Ratings:</strong> ${hotel.star_rating}</p>
          <p><strong>Price:</strong> $${hotel.price}</p>
        `;
      hotelList.appendChild(hotelInfo);
    });
  } catch (error) {
    console.error("Failed to fetch hotel data:", error);
  }
};

const MONGO_URI =
  "mongodb+srv://constantx003:qN807YxSYdNCP11n@wdd330finalproject-db.01sfc.mongodb.net/?retryWrites=true&w=majority&appName=wdd330finalProject-db"; // MongoDB url
const DATABASE_NAME = "hotelDB";
const COLLECTION_NAME = "hotels";
const MOCKAROO_URL =
  "https://api.mockaroo.com/api/53c3fbf0?count=1000&key=c8273bc0"; // My Mockaroo key

export async function fetchAndStoreData() {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Fetch data from Mockaroo API
    const response = await axios.get(MOCKAROO_URL);
    const mockData = response.data;

    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Insert Mockaroo data into MongoDB
    const result = await collection.insertMany(mockData);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

fetchAndStoreData(); // export this to the right .js file

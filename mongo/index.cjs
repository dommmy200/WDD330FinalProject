const axios = require('axios');
const { MongoClient } = require('mongodb');

const apiKey = "c8273bc0";
const url = `https://my.api.mockaroo.com/wdd330finalproject.json?key=${apiKey}`;

const MONGO_URI = 'mongodb://localhost:27017';
const DATABASE_NAME = 'hotelDB';
const COLLECTION_NAME = 'hotels';
const MOCKAROO_URL = url;

async function fetchAndStoreData() {
  const client = new MongoClient(MONGO_URI);

  try {
    // Fetch data from Mockaroo API
    const response = await axios.get(MOCKAROO_URL);
    const mockData = response.data;

    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Insert Mockaroo data into MongoDB
    const result = await collection.insertMany(mockData);
    console.log(`${result.insertedCount} documents inserted.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

fetchAndStoreData();

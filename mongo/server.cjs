const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
// const app = express();

const PORT = 3000;

// import express from 'express'; // Ensure express is installed
// import cors from 'cors'; // If using CORS

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// MongoDB connection details
const MONGO_URI =
  "mongodb+srv://constantx003:qN807YxSYdNCP11n@wdd330finalproject-db.01sfc.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=wdd330finalProject-db";
const DATABASE_NAME = "hotelDB";
const COLLECTION_NAME = "hotels";

// Route to fetch hotel data
app.get("/hotels", async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db(DATABASE_NAME);
    const hotels = await db.collection(COLLECTION_NAME).find({}).toArray();

    res.json(hotels); // Send data as JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error retrieving hotels");
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

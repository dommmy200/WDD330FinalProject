import { writeToJsonFile } from "./utils.mjs";
// server.js
// import express from "express";
// import { MongoClient } from "mongodb";
// import cors from "cors";

// const app = express();
// const PORT = 3000;
// const MONGO_URI =
//   "mongodb+srv://constantx003:qN807YxSYdNCP11n@wdd330finalproject-db.01sfc.mongodb.net/?retryWrites=true&w=majority&appName=wdd330finalProject-db"; // My MongoDB URI
// const DATABASE = "hotelDB";
// const COLLECTION = "hotels";

// // Middleware
// app.use(cors()); // Enable CORS for frontend requests

// // Route to get hotel data
// app.get("/hotels", async (req, res) => {
//   try {
//     const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
//     await client.connect();
//     const db = client.db(DATABASE);
//     const hotels = await db.collection(COLLECTION).find().toArray();
//     res.json(hotels);
//     client.close();
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

function userProfile() {
  document.getElementById("user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const fname = document.getElementById("firstname").value;
      const lname = document.getElementById("surname").value;
      const oname = document.getElementById("othername").value;
      const gender = document.getElementById("gender").value;
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const amount = document.getElementById("amount").value;
      const remark = document.getElementById("remark").value;
      // Template for localStorage
      const profileObj = {
        fname: fname,
        lname: lname,
        oname: oname,
        age: age,
        gender: gender,
        email: email,
        phone: phone,
        username: username,
        amount: amount,
        remark: remark,
      };
      // Template for local DB
      const profileToDB = {
        card: {
          id_number: 0,
          cvv: 0,
          card_type: "",
          card_number: "",
          expiration_date: "",
          amount: amount,
          username: username,
          password: password,
        },
        person: {
          fname: fname,
          lname: lname,
          oname: oname,
          age: age,
          gender: gender,
          email: email,
          phone: phone,
        },
        status: "false",
      };
      // Store in local database
      const filePath = "../public/user-profile.json";
      writeToJsonFile(filePath, profileToDB);
      //Store in local storage
      localStorage.setItem("userProfile", JSON.stringify(profileObj));
      alert("Thank You!\n\nRedirecting to make payment.");
      window.location.href = "../booking-confirmation/booking-confirmation.html";
    } catch (error) {
      console.log("Error:", error);
    }
  });
}
userProfile();

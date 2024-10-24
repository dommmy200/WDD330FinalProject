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

export function userProfile() {
  document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const profileArray = [];
      const fName = document.getElementById("firstname").value;
      const lName = document.getElementById("surname").value;
      const oName = document.getElementById("othername").value;
      const gender = document.getElementById("gender").value;
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const remark = document.getElementById("remark").value;

      const profileObj = {
        fname: `${fName}`,
        lName: `${lName}`,
        oName: `${oName}`,
        age: `${age}`,
        gender: `${gender}`,
        email: `${email}`,
        phone: `${phone}`,
        remark: `${remark}`,
      };
      profileArray.push(profileObj);

      localStorage.setItem("userProfile", JSON.stringify(profileArray));
      alert('Thank You!\n\nRedirecting to make payment.');
      window.location.href = '../booking-confirmation/payment.html';
    } catch (error) {
      console.log("Error:", error);
    }
  });
}
userProfile();

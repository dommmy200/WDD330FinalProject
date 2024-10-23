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
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export function setUserProfile() {
  const form = document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      const fname = document.getElementById('name');
      const lname = document.getElementById('surname');
      const oname = document.getElementById('othername');
      const age = document.getElementById('age');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone-number');
      const remark = document.getElementById('remark');

      const profileArray = [];
      const profileObject = {
        fname: `${fname}`,
        lname: `${lname}`,
        oname: `${oname}`,
        age: `${age}`,
        email: `${email}`,
        phone: `${phone}`,
        remark: `${remark}`,
      };
      profileArray.push(profileObject);

      localStorage.setItem('userProfile', JSON.stringify(profileArray));
      alert('Redirecting to Payment Page!');
      window.location.href = '../booking-confirmation/';
    } catch (error){
      console.log('Error: ', error); //console.error(error);
    }
  });
}
setUserProfile();
export function userProfile() {
  document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const profileArray = [];
    const fName = document.getElementById('name');
    const lName = document.getElementById('surname');
    const oName = document.getElementById('othername');
    const gender = document.getElementById('gender');
    const email = document.getElementById('email');
    const phone = document.getElementById('phonenumber');

    const profileObj = {
      fname: fName,
      lName: lName,
      oName: oName,
      gender: gender,
      email: email,
      phone: phone,
    };
    profileArray.push(profileObj);

    localStorage.setItem('userProfile', JSON.stringify(profileArray))
  });
}
userProfile();
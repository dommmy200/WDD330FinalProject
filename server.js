// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Middleware to parse JSON request bodies

// Path to JSON files
const cardsFilePath = path.join(__dirname, 'public', 'json', 'cards.json');
const userProfileFilePath = path.join(__dirname, 'public', 'json', 'user-profile.json');

// Route to fetch and update cards.json
app.route('/utils/cards')
  .get((req, res) => {
    fs.readFile(cardsFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading cards file');
      res.status(200).json(JSON.parse(data));
    });
  })
  .post((req, res) => {
    const newCard = req.body;

    fs.readFile(cardsFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading cards file');

      const cards = JSON.parse(data);
      cards.push(newCard);

      fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), err => {
        if (err) return res.status(500).send('Error updating cards file');
        res.status(200).send('Card added successfully');
      });
    });
  });

// Route to fetch and update user-profile.json
app.route('/utils/user-profile')
  .get((req, res) => {
    fs.readFile(userProfileFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading user profile file');
      res.status(200).json(JSON.parse(data));
    });
  })
  .post((req, res) => {
    const newProfile = req.body;

    fs.readFile(userProfileFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading user profile file');

      const profiles = JSON.parse(data);
      profiles.push(newProfile);

      fs.writeFile(userProfileFilePath, JSON.stringify(profiles, null, 2), err => {
        if (err) return res.status(500).send('Error updating user profile file');
        res.status(200).send('User profile added successfully');
      });
    });
  });

// Start the server on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

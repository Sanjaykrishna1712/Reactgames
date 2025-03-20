const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = 5000;
const API_URL = "https://www.freetogame.com/api/games";

// Fetch games by category
app.get("/games", async (req, res) => {
  try {
    const category = req.query.category;
    const response = await axios.get(`${API_URL}?category=${category}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching games" });
  }
});

// Fetch a single game by ID
app.get("/game/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://www.freetogame.com/api/game?id=${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching game details" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

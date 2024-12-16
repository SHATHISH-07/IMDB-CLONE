require("dotenv").config();

const express = require("express");
const axios = require("axios");
const genresRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/genre/movie/list";

genresRouter.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json(data.genres);
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

module.exports = genresRouter;

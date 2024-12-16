require("dotenv").config();
const express = require("express");
const watchListRouter = express.Router();
const WatchList = require("../models/watchListModel");

watchListRouter.get("/", async (req, res) => {
  try {
    const userWatchList = await WatchList.find({ user: req.user.id }).populate(
      "user",
      "username"
    );
    res.json(userWatchList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchList." });
  }
});

watchListRouter.post("/", async (req, res) => {
  const { movieId, title, poster_path, mediaType } = req.body;

  if (!movieId) {
    return res.status(400).json({ error: "Movie ID is required." });
  }

  try {
    const newEntry = new WatchList({
      user: req.user.id,
      movieId,
      title,
      poster_path,
      mediaType,
    });
    await newEntry.save();

    req.user.watchList = req.user.watchList.concat(newEntry._id);
    await req.user.save();

    res.status(201).json({ message: "Movie added to watchList." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add movie to watchList." });
  }
});

module.exports = watchListRouter;

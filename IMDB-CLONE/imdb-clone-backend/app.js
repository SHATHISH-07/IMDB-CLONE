require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const config = require("./utils/config");
const userRouter = require("./controllers/users");
const watchListRouter = require("./controllers/watchlists");
const genresRouter = require("./controllers/movie/genres");
const movieImageRouter = require("./controllers/movie/movieImages");
const movieVideoRouter = require("./controllers/movie/movieVideo");
const movieReviewRouter = require("./controllers/movie/movieReviews");
const nowPlayingRouter = require("./controllers/movie/nowPlaying");
const popularMovieRouter = require("./controllers/movie/popularMovie");
const recommendMovieRouter = require("./controllers/movie/recommendMovie");
const searchMoviesRouter = require("./controllers/movie/searchMovies");
const topRatedMovieRouter = require("./controllers/movie/topRatedMovie");
const trendingMovieRouter = require("./controllers/movie/trendingMovie");
const upcomingMovieRouter = require("./controllers/movie/upcomingMovie");
const personRouter = require("./controllers/person/person");
const genreTvRouter = require("./controllers/tvShow/genreTv");
const nowPlayingTvRouter = require("./controllers/tvShow/nowPlayingTv");
const onAirTvRouter = require("./controllers/tvShow/onAirTv");
const popularTvRouter = require("./controllers/tvShow/popularTv");
const recommendTvRouter = require("./controllers/tvShow/recommendTv");
const searchTvRouter = require("./controllers/tvShow/searchTv");
const topRatedTvRouter = require("./controllers/tvShow/topRatedTv");
const trendingTvRouter = require("./controllers/tvShow/trendingTv");
const tvReviewsRouter = require("./controllers/tvShow/tvReviews");
const tvShowImageRouter = require("./controllers/tvShow/tvShowImages");
const tvVideoRouter = require("./controllers/tvShow/tvVideo");
const middleware = require("./utils/middleware");
const path = require("path");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// user, login, watchList
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use(
  "/movie/watchList",
  middleware.tokenExtractor,
  middleware.userExtractor,
  watchListRouter
);

// movie
app.use("/movie/genres", genresRouter);
app.use("/movie/image", movieImageRouter);
app.use("/movie/video", movieVideoRouter);
app.use("/movie/review", movieReviewRouter);
app.use("/movie/now_playing", nowPlayingRouter);
app.use("/movie/popular", popularMovieRouter);
app.use("/movie/recommend", recommendMovieRouter);
app.use("/movie/search", searchMoviesRouter);
app.use("/movie/top_rated", topRatedMovieRouter);
app.use("/movie/trending", trendingMovieRouter);
app.use("/movie/upcoming", upcomingMovieRouter);

// person
app.use("/person", personRouter);

// tvShow
app.use("/tv/genres", genreTvRouter);
app.use("/tv/now_playing", nowPlayingTvRouter);
app.use("/tv/on_air", onAirTvRouter);
app.use("/tv/popular", popularTvRouter);
app.use("/tv/recommend", recommendTvRouter);
app.use("/tv/search", searchTvRouter);
app.use("/tv/top_rated", topRatedTvRouter);
app.use("/tv/trending", trendingTvRouter);
app.use("/tv/review", tvReviewsRouter);
app.use("/tv/image", tvShowImageRouter);
app.use("/tv/video", tvVideoRouter);

// error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

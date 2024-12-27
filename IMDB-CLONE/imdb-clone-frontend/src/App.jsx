import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import SignUpSection from "./components/SignUpSection";
import LoginSection from "./components/LoginSection";
import WatchList from "./components/WatchList";
import user from "./services/user";
import login from "./services/login";
import watchList from "./services/watchList";
import trendingMovie from "./services/movies/trendingMovie";
import getNowPlayingMovie from "./services/movies/nowPlaying";
import genre from "./services/movies/genre";
import genreTv from "./services/tvShows/genreTv";
import getTopRatedMovie from "./services/movies/topRatedMovie";
import getPopularMovie from "./services/movies/popularMovie";
import getUpcomingMovie from "./services/movies/upcomingMovie";
import getOnAirTv from "./services/tvShows/onAirTv";
import getPopularTv from "./services/tvShows/popularTv";
import getTopRatedTv from "./services/tvShows/topRatedTv";
import trendingTv from "./services/tvShows/trendingTv";
import person from "./services/persons/person";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [trendingMoviesDay, setTrendingMoviesDay] = useState([]);
  const [trendingMoviesWeek, setTrendingMoviesWeek] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingTvShowsDay, setTrendingTvShowsDay] = useState([]);
  const [trendingTvShowsWeek, setTrendingTvShowsWeek] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [onAirTvShows, setOnAirTvShows] = useState([]);
  const [persons, setPersons] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedInUser));
      watchList.setToken(loggedInUser.token);

      setCurrentUser(loggedInUser);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setCurrentUser(null);
    watchList.setToken(null);
    navigate("/");
  };

  // Handle sign up
  const handleSignUp = async ({ username, password, name }) => {
    try {
      const newUser = await user.create({ username, password, name });
      window.localStorage.setItem("loggedUser", JSON.stringify(newUser));

      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Watchlist
  const handleAddToWatchList = async (movie, type) => {
    const movieData = {
      movieId: movie.id,
      title: type === "movie" ? movie.title : movie.name,
      poster_path: movie.poster_path,
      mediaType: type,
      rating: movie.vote_average,
      releasedAt: type === "movie" ? movie.release_date : movie.first_air_date,
    };

    const isAlreadyInWatchlist = watchlist.some(
      (item) => item.movieId === movie.id
    );
    if (isAlreadyInWatchlist) {
      console.log("Movie is already in the watchlist");
      return;
    }

    try {
      const newWatchList = await watchList.create(movieData);
      setWatchlist((prevWatchlist) => [...prevWatchlist, newWatchList]);
    } catch (error) {
      console.error("Error adding movie to watch list:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleRemoveFromWatchList = async (movieId) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.movieId !== movieId)
    );

    try {
      await watchList.remove(movieId);

      fetchWatchList();
    } catch (error) {
      console.error("Error removing movie from watch list:", error);

      setWatchlist((prevWatchlist) => [
        ...prevWatchlist,
        watchlist.find((movie) => movie.movieId === movieId),
      ]);
    }
  };

  const fetchWatchList = async () => {
    try {
      const watchListItems = await watchList.getAll();
      setWatchlist(watchListItems);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchWatchList();
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const loggedInUser = JSON.parse(loggedUserJSON);
        setCurrentUser(loggedInUser);
        watchList.setToken(loggedInUser.token);
      }
    } catch (error) {
      console.error("Failed to retrieve logged in user:", error);
    }
  }, []);

  // Fetch movie, tv, and genre data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching Movies
        const trendingMoviesDayResponse =
          await trendingMovie.getTrendingMovieByDay(page);
        setTrendingMoviesDay(trendingMoviesDayResponse.results || []);

        const trendingMoviesWeekResponse =
          await trendingMovie.getTrendingMovieByWeek(page);
        setTrendingMoviesWeek(trendingMoviesWeekResponse.results || []);

        const topRatedMoviesResponse = await getTopRatedMovie(page);
        setTopRatedMovies(topRatedMoviesResponse.results || []);

        const popularMoviesResponse = await getPopularMovie(page);
        setPopularMovies(popularMoviesResponse.results || []);

        const nowPlayingMovieResponse = await getNowPlayingMovie(page);
        setNowPlayingMovie(nowPlayingMovieResponse.results || []);

        const upcomingMoviesResponse = await getUpcomingMovie(page);
        setUpcomingMovies(upcomingMoviesResponse.results || []);

        // Fetching TV Shows
        const trendingTvShowsDayResponse = await trendingTv.getTrendingTvByDay(
          page
        );
        setTrendingTvShowsDay(trendingTvShowsDayResponse.results || []);

        const trendingTvShowsWeekResponse =
          await trendingTv.getTrendingTvByWeek(page);
        setTrendingTvShowsWeek(trendingTvShowsWeekResponse.results || []);

        const topRatedTvShowsResponse = await getTopRatedTv(page);
        setTopRatedTvShows(topRatedTvShowsResponse.results || []);

        const popularTvShowsResponse = await getPopularTv(page);
        setPopularTvShows(popularTvShowsResponse.results || []);

        const onAirTvShowsResponse = await getOnAirTv(page);
        setOnAirTvShows(onAirTvShowsResponse.results || []);

        // Fetching Genres
        const genresResponse = await genre.getAllGenresMovie();
        setGenres(genresResponse || []);

        const tvGenresResponse = await genreTv.getAllGenresTv();
        setTvGenres(tvGenresResponse || []);

        // Fetching Persons
        const popularPersonsResponse = await person.fetchPopularPersons(page);
        setPersons(popularPersonsResponse.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page - 1);

  return (
    <div>
      <NavBar currentUser={currentUser} handleLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              trendingMoviesDay={trendingMoviesDay}
              trendingMoviesWeek={trendingMoviesWeek}
              topRatedMovies={topRatedMovies}
              popularMovies={popularMovies}
              nowPlayingMovie={nowPlayingMovie}
              upcomingMovies={upcomingMovies}
              trendingTvShowsDay={trendingTvShowsDay}
              trendingTvShowsWeek={trendingTvShowsWeek}
              topRatedTvShows={topRatedTvShows}
              popularTvShows={popularTvShows}
              onAirTvShows={onAirTvShows}
              persons={persons}
              genres={genres}
              tvGenres={tvGenres}
              handleAddToWatchList={handleAddToWatchList}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUpSection handleSignUp={handleSignUp} />}
        />
        <Route
          path="/login"
          element={<LoginSection handleLogin={handleLogin} />}
        />

        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              onRemove={handleRemoveFromWatchList}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

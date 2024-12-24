import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import trendingMovie from "./services/movies/trendingMovie";
import getNowPlayingMovie from "./services/movies/nowPlaying";
import genre from "./services/movies/genre";
import genreTv from "./services/tvShows/genreTv";
import HorizontalCards from "./components/HorizontalCards";
import PersonsScrollComponent from "./components/PersonScrollComponent";
import getTopRatedMovie from "./services/movies/topRatedMovie";
import getPopularMovie from "./services/movies/popularMovie";
import getUpcomingMovie from "./services/movies/upcomingMovie";
import getOnAirTv from "./services/tvShows/onAirTv";
import getPopularTv from "./services/tvShows/popularTv";
import getTopRatedTv from "./services/tvShows/topRatedTv";
import trendingTv from "./services/tvShows/trendingTv";
import person from "./services/persons/person";
import Banner from "./components/Banner";

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [onAirTvShows, setOnAirTvShows] = useState([]);
  const [persons, setPersons] = useState([]);
  const [movie, setMovie] = useState(null);
  const [nowPlayingHeroMovies, setNowPlayingHeroMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [heroPage, setHeroPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        setLoading(true);
        const response = await getNowPlayingMovie(heroPage);
        setNowPlayingHeroMovies(response.results || []);
        if (response.results?.length) {
          setMovie(response.results[0]); // Set the first movie as default
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroMovies();

    const pageInterval = setInterval(() => {
      setHeroPage((prevPage) => (prevPage < 245 ? prevPage + 1 : 1));
    }, 40000);

    return () => clearInterval(pageInterval);
  }, [heroPage]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genre.getAllGenresMovie();
        setGenres(response || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await getUpcomingMovie(page);
        setUpcomingMovies(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };
    fetchUpcomingMovies();
  }, [page]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await getNowPlayingMovie(page);
        setNowPlayingMovie(response.results || []);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchNowPlayingMovies();
  }, [page]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await trendingMovie.getTrendingMovieByDay(page);

        setTrendingMovies(response.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, [page]);

  // Change movie banner every 5 seconds
  useEffect(() => {
    if (nowPlayingHeroMovies.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(
          Math.random() * nowPlayingHeroMovies.length
        );
        setMovie(nowPlayingHeroMovies[randomIndex]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [nowPlayingHeroMovies]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await getTopRatedMovie(page);
        setTopRatedMovies(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, [page]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await getPopularMovie(page);
        setPopularMovies(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchPopularMovies();
  }, [page]);

  useEffect(() => {
    const fetchPopularTvShows = async () => {
      try {
        const response = await getPopularTv(page);
        setPopularTvShows(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchPopularTvShows();
  }, [page]);

  useEffect(() => {
    const fetchTopRatedTvShows = async () => {
      try {
        const response = await getTopRatedTv(page);
        setTopRatedTvShows(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopRatedTvShows();
  }, [page]);

  useEffect(() => {
    const fetchOnAirTvShows = async () => {
      try {
        const response = await getOnAirTv(page);
        setOnAirTvShows(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchOnAirTvShows();
  }, [page]);

  useEffect(() => {
    const fetchTrendingTvShows = async () => {
      try {
        const response = await trendingTv.getTrendingTvByDay(page);
        setTrendingTvShows(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTrendingTvShows();
  }, [page]);

  useEffect(() => {
    const fetchPopularPersons = async () => {
      try {
        const response = await person.fetchPopularPersons(page);
        setPersons(response.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchPopularPersons();
  }, [page]);

  useEffect(() => {
    const fetchAllTvGenres = async () => {
      try {
        const response = await genreTv.getAllGenresTv();
        setTvGenres(response || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchAllTvGenres();
  });

  const handleAddToWatchlist = () => {
    alert("Added to Watchlist!");
  };

  const handleWatchTrailer = (movie, type) => {
    if (movie) {
      window.open(
        `https://www.youtube.com/results?search_query=${
          type === "movie" ? movie.original_title : movie.original_name
        } trailer`,
        "_blank"
      );
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 dark:from-gray-900 dark:via-gray-700 dark:to-gray-900 ">
      <NavBar />

      <HeroSection
        movie={movie}
        loading={loading}
        genres={genres}
        onAddToWatchlist={handleAddToWatchlist}
        onWatchTrailer={handleWatchTrailer}
      />

      <Banner />

      <HorizontalCards
        Movies={trendingMovies}
        title="Catch the latest buzz"
        subText="Movies"
        genres={genres}
        onWatchTrailer={handleWatchTrailer}
        type="movie"
      />

      <HorizontalCards
        Movies={topRatedMovies}
        title="Critics' Choice"
        subText="Movies"
        genres={genres}
        onWatchTrailer={handleWatchTrailer}
        type="movie"
      />

      <HorizontalCards
        Movies={popularMovies}
        title="What Everyone's Watching"
        subText="Movies"
        genres={genres}
        onWatchTrailer={handleWatchTrailer}
        type="movie"
      />

      <HorizontalCards
        Movies={upcomingMovies}
        title="Coming Soon"
        subText="Movies"
        genres={genres}
        onWatchTrailer={handleWatchTrailer}
        type="movie"
      />

      <HorizontalCards
        Movies={nowPlayingMovie}
        title="Now Playing"
        subText="Movies"
        genres={genres}
        onWatchTrailer={handleWatchTrailer}
        type="movie"
      />

      <HorizontalCards
        Movies={topRatedTvShows}
        title="Top Rated"
        subText="TV Shows"
        genres={tvGenres}
        onWatchTrailer={handleWatchTrailer}
        type="tv"
      />

      <HorizontalCards
        Movies={popularTvShows}
        title="Popular"
        subText="TV Shows"
        genres={tvGenres}
        onWatchTrailer={handleWatchTrailer}
        type="tv"
      />

      <HorizontalCards
        Movies={trendingTvShows}
        title="Trending"
        subText="TV Shows"
        genres={tvGenres}
        onWatchTrailer={handleWatchTrailer}
        type="tv"
      />

      <HorizontalCards
        Movies={onAirTvShows}
        title="On Air"
        subText="TV Shows"
        genres={tvGenres}
        onWatchTrailer={handleWatchTrailer}
        type="tv"
      />

      <PersonsScrollComponent people={persons} />
    </div>
  );
};

export default App;

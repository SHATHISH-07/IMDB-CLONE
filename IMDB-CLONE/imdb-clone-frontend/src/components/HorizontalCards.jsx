import { useRef, useState, useEffect } from "react";

const HorizontalCards = ({
  Movies,
  title = "Movies",
  subText,
  onWatchTrailer,
  genres,
  type,
}) => {
  const containerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const popupRef = useRef(null);
  const ignoreClick = useRef(false); // Prevent immediate closing

  const getGenreNames = (genreIds) => {
    if (!genres.length) return "Fetching genres...";
    return genreIds
      .map((id) => {
        const foundGenre = genres.find((genre) => genre.id === id);
        return foundGenre ? foundGenre.name : "Unknown";
      })
      .join(", ");
  };

  const handleShowPopup = (movie) => {
    console.log("Opening popup for movie:", movie);
    if (!movie) {
      console.error("Movie object is undefined or null.");
      return;
    }
    setSelectedMovie(movie);
    setShowPopup(true);
    ignoreClick.current = true; // Ignore the click that triggered the popup
    setTimeout(() => (ignoreClick.current = false), 100); // Allow clicks after a short delay
    console.log("Popup state set to true. Selected movie:", movie);
  };

  const handleClosePopup = () => {
    console.log("Closing popup");
    setShowPopup(false);
    setSelectedMovie(null);
  };

  const handleClickOutside = (e) => {
    if (ignoreClick.current) {
      console.log("Ignoring initial click.");
      return;
    }
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      console.log("Detected click outside the popup.");
      handleClosePopup();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (showPopup) {
        handleClickOutside(e);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }); // Only re-run when showPopup changes

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth;
      containerRef.current.scrollBy({
        left: direction === "forward" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 py-10 w-full text-black dark:text-white">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <i className="fa-solid fa-film text-gray-700 dark:text-gray-300"></i>{" "}
            {title}
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-lg">{subText}</p>
        </div>
        <button
          onClick={() => handleScroll("forward")}
          className="hidden md:block bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 shadow-lg transition-all"
        >
          View All
        </button>
      </div>

      {/* Card Container */}
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-scroll scroll-smooth snap-x snap-mandatory w-full scrollbar-hidden"
        >
          {Movies.map((movie) => (
            <div
              key={movie.id}
              className="snap-center flex-shrink-0 w-[250px] h-[400px] rounded-lg shadow-xl overflow-hidden relative group bg-gray-900 dark:bg-gray-800"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent group-hover:from-gray-900 transition-all"></div>

              {/* Bookmark Icon */}
              <div className="absolute top-0 right-0 bg-transparent cursor-pointer rounded-full  opacity-90 hover:opacity-100 transition-all hover:scale-125">
                <i className="fa-solid fa-bookmark text-black text-5xl"></i>
                <i className="fa-solid fa-plus absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm"></i>
              </div>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-lg font-bold text-white truncate">
                  {type === "movie"
                    ? movie.original_title
                    : movie.original_name || "Unknown Title"}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                  {movie.vote_average.toFixed(1) || "N/A"}
                </p>

                {/* Info Button */}
                <button
                  onClick={() => handleShowPopup(movie)}
                  className="absolute top-7 hover:text-blue-400 right-2 text-white p-2 rounded-full transition-all shadow-lg"
                >
                  <i className="fa-solid fa-info-circle text-lg"></i>
                </button>

                {/* Watch Trailer Button */}
                <button
                  onClick={() => onWatchTrailer(movie, type)}
                  className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all shadow-md w-full"
                >
                  <i className="fa-solid fa-play-circle mr-2"></i> Watch Trailer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleScroll("backward")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition-all"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={() => handleScroll("forward")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition-all"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[80%] max-w-[800px] relative flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <i className="fa-solid fa-times text-2xl"></i>
            </button>

            {/* Poster on the left (on small screens, make it smaller) */}
            <div
              className="w-[150px] sm:w-[200px] h-[225px] sm:h-[300px] bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                  selectedMovie.poster_path || ""
                })`,
              }}
            ></div>

            {/* Movie Details on the right */}
            <div className="ml-0 sm:ml-6 flex flex-col justify-between w-full mt-4 sm:mt-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMovie.original_title ||
                    selectedMovie.original_name ||
                    "Unknown Title"}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mt-2">
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    {selectedMovie.vote_average?.toFixed(1) || "N/A"}
                  </span>
                  <span>
                    {selectedMovie.release_date ||
                      selectedMovie.first_air_date ||
                      "N/A"}
                  </span>
                  <span>{getGenreNames(selectedMovie.genre_ids)}</span>
                </div>
                <div className="mt-4">
                  <p>{selectedMovie.overview || "No overview available."}</p>
                </div>
              </div>

              {/* Buttons at the bottom */}
              <div className="mt-6 flex gap-4">
                <button className="  text-blue-600 bg-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all">
                  <i className="fa-solid fa-plus mr-2"></i> Add to Watchlist
                </button>
                <button
                  onClick={() => onWatchTrailer(selectedMovie, type)}
                  className="hidden md:block text-gray-600 bg-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <i className="fa-solid fa-play-circle mr-2"></i> Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalCards;

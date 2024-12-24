import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";
import MenuBarContent from "./MenuBarContent";
import { searchMovies } from "../services/movies/movieSearch";
import { searchTvShows } from "../services/tvShows/searchTv";
import DropDown from "./DropDown";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState("movie");

  useEffect(() => {
    if (!searchInput) {
      setSearchResult([]); // Clear results immediately when input is empty
      return;
    }

    const fetchData = async () => {
      try {
        let response;
        if (selectedOption === "movie") {
          response = await searchMovies(searchInput);
        } else {
          response = await searchTvShows(searchInput);
        }
        setSearchResult(response.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const debounce = setTimeout(() => fetchData(), 300); // Increase debounce time to avoid too frequent calls
    return () => clearTimeout(debounce);
  }, [searchInput, selectedOption]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      {/* Search Results */}
      <div
        className={`search-results absolute  top-16 left-0 right-0 z-20 bg-white dark:text-white dark:bg-black rounded-md shadow-md md:w-2/3 w-11/12 mx-auto mt-11 md:mt-3  ${
          searchResult.length > 0 ? "block" : "hidden"
        }`}
      >
        {searchResult.length > 0 ? (
          searchResult.map((item) => {
            const title = selectedOption === "movie" ? item.title : item.name;
            const releasedDate =
              selectedOption === "movie"
                ? item.release_date
                : item.first_air_date;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${item.poster_path}`
                        : "https://via.placeholder.com/100x150?text=No+Image"
                    }
                    alt={title || "No Title"}
                    className="md:w-[100px] md:h-[100px] w-12 h-16 object-cover mr-2"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {title || "Unknown Title"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {releasedDate || "Unknown Date"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-2 text-gray-500 dark:text-gray-400">
            No results found.
          </p>
        )}
      </div>

      {/* Navigation Bar */}
      <nav className="navbar p-2 flex items-center justify-between bg-white text-black dark:bg-customBlack dark:text-white">
        <div>
          <button
            onClick={toggleMenu}
            className="px-3 py-1"
            aria-label="Toggle Menu"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Home Button */}
        <div className="hidden lg:block">
          <button
            className="px-4 py-2 rounded-lg text-black hover:text-white hover:bg-gray-600 dark:text-white dark:hover:bg-gray-600"
            aria-label="Home"
          >
            <i className="fa-solid fa-house"></i> Home
          </button>
        </div>

        {/* Dropdown for Large Screens */}
        <div className="hidden lg:block">
          <DropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>

        {/* Search Bar */}
        <div className="searchBar flex flex-col md:flex-row w-full md:w-[50%] space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="Search for movies"
            className="px-4 py-2 rounded-md w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            onChange={handleSearch}
            aria-label="Search Movies"
          />
          <button
            className="px-4 py-2 bg-gray-600  text-white rounded-md"
            aria-label="Search Button"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>

        {/* Right-Side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="px-4 py-2 rounded-lg  text-black hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-600"
            aria-label="Watchlist"
          >
            <i className="fa-solid fa-bookmark"></i> Watchlist
          </button>
          <button
            className="px-4 py-2 text-black rounded-lg hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-600"
            aria-label="Sign In"
          >
            <i className="fa-solid fa-user"></i> Sign In
          </button>
        </div>

        <div>
          <DarkModeToggle />
        </div>

        {/* Full-Screen Menu Overlay */}
        <MenuBarContent isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </nav>
    </>
  );
};

export default NavBar;

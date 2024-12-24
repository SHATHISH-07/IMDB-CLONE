import React from "react";

const MenuBarContent = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div>
      <div
        className={`fixed inset-0 bg-white bg-opacity-90 dark:bg-opacity-80 flex items-center justify-center z-50 text-black dark:bg-black dark:text-white 
          transition-all duration-500 ease-in-out transform ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 pointer-events-none"
          }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-2xl bg-customHover w-12 h-12 rounded-full flex items-center justify-center  hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-x"></i>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 w-full max-w-screen-xl max-h-[80vh] overflow-y-auto md:overflow-hidden">
          {/* Movies Section */}
          <div className="menu-section space-y-4">
            <h2 className="text-xl font-semibold">Movies</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Trending Movies
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Popular Movies
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Top Rated Movies
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Upcoming Movies
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Now Playing
                </a>
              </li>
              <div className="pt-10">
                <li className="text-lg hover:text-blue-500 transition">
                  <a href="#">
                    <i className="fa-solid fa-user"></i> Sign In
                  </a>
                </li>
              </div>
            </ul>
          </div>

          {/* TV Shows Section */}
          <div className="menu-section space-y-4">
            <h2 className="text-xl font-semibold">TV Shows</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Trending TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Popular TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Top Rated TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  On Air
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  On Air Today
                </a>
              </li>
              <div className="pt-10">
                <li className="text-lg hover:text-blue-500 transition">
                  <a href="#">
                    <i className="fa-solid fa-bookmark"></i> WatchList
                  </a>
                </li>
              </div>
            </ul>
          </div>

          {/* Movie Genres Section - Hidden on small screens */}
          <div className="menu-section space-y-4 hidden sm:block">
            <h2 className="text-xl font-semibold">Movie Genres</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Adventure
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Animation
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Crime
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Documentary
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Family
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Fantasy
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  History
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Horror
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Music
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Mystery
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Romance
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Sci-Fi
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Thriller
                </a>
              </li>
            </ul>
          </div>

          {/* TV Genres Section - Hidden on small screens */}
          <div className="menu-section space-y-4 hidden sm:block">
            <h2 className="text-xl font-semibold">TV Genres</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Action & Adventure
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Animation
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Crime
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Documentary
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Family
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Kids
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Mystery
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Reality
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Sci-Fi & Fantasy
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-500 transition">
                  Talk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBarContent;

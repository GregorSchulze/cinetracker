import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import { IoSearch } from "react-icons/io5";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }

    loadData();
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError(err.message || "Search failed");
      setMovies([]);
    } finally {
      setLoading(false);
      if (!searchQuery ? loadData() : null) return;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === "") {
      return loadPopularMovies();
    }
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 p-4">
      {/* Search Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="max-w-sm mx-auto mt-8">
          <div className="flex">
            <input
              type="text"
              className="bg-gray-50  text-black text-sm rounded-l-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white "
              placeholder="Search for Movie..."
              required
              value={searchQuery}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button
              type="submit"
              className="flex gap-2 p-4 text-sm text-white bg-gray-500 dark:bg-gray-800  rounded-r-lg  dark:bg-blue-600 dark:hover:bg-blue-700 "
            >
              <IoSearch className="w-5 h-5" />

              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                ""
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-sm mx-auto mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          {error}
        </div>
      )}

      {/* Movies Grid */}
      <div className="max-w-[1400px] md:max-w-[700] mx-auto mt-12">
        {loading && movies.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 "></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

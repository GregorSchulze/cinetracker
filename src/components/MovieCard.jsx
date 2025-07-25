// MovieCard.jsx
import React from "react";
import { useMovieContext } from "../context/MovieContext";

// Icons neu
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";

function MovieCard({ movie, onOpenTrailer }) {
  const {
    isFavorite,
    addToFavorites,
    removeFavorites,
    genresMap,
    genresLoading,
    genresError,
  } = useMovieContext();

  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation(); // Verhindert, dass der Klick auf den Favoriten-Button das Modal öffnet
    if (favorite) removeFavorites(movie.id);
    else addToFavorites(movie);
  }

  const getGenresNames = () => {
    if (genresLoading) return "Loading genres...";
    if (genresError) return "Error loading genres";
    if (movie.genre_ids && movie.genre_ids.length > 0) {
      const names = movie.genre_ids.map((id) => genresMap[id]);

      return names.length > 0 ? names.join(" • ") : "No Genre";
    }
    return "No Genre";
  };

  return (
    <div className="cursor-pointer" onClick={onOpenTrailer}>
      <div className="group relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Poster */}
        <img
          className="rounded-md mb-3 w-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Bookmark */}
        <div className="absolute top-2 right-2 z-10">
          <button
            className={`text-2xl ${
              favorite ? "text-[#db0000]" : "text-white"
            } hover:scale-110 transition-transform`}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(e);
            }}
          >
            {favorite ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        {/* Play Button */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="text-white text-4xl hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              onOpenTrailer();
            }}
          >
            <FaPlayCircle />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 text-black dark:text-white">
        {/* Genre */}
        <p className="text-xs text-gray-400">{getGenresNames()}</p>
        {/* Title */}
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        {/* Release */}
        <p className="text-sm text-gray-500">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;

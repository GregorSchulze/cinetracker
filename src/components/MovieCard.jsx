import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
  // Import Mark, Save and Delete Favorites
  const { isFavorite, addToFavorites, removeFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="">
      <div className="group relative rounded-md">
        <img
          className="rounded-md mb-3 "
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        {/* Verlauf */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-90"></div>
        <div className="absolute inset-0  flex justify-center items-end pb-3 opacity-0 group-hover:opacity-100">
          <button
            className={`text-3xl ${favorite ? "text-red-500" : "text-white"}`}
            onClick={onFavoriteClick}
          >
            {`${favorite ? "✅" : "❤️"}`}
          </button>
        </div>
      </div>
      <div className="text-black dark:text-white">
        <h3 className="text-xl font-bold ">{movie.title}</h3>
        <p className="text-sm ">{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;

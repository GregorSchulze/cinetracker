import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Movie } from "../lib/types";

const Favorites = (): JSX.Element => {
  const { favorites, openModalWithMovie } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="p-4 justify-center">
        {/* <h2>Your Favorites</h2> */}
        <div className="max-w-[1400px] mx-auto mt-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie: Movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              onOpenTrailer={() => openModalWithMovie(movie)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-black dark:text-white max-w-[1400px] md:max-w-[700] mx-auto mt-12">
      <h2>No favorite movies yet</h2>
      <p>Start adding movies to your favorites and they will appear here.</p>
    </div>
  );
};

export default Favorites;

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getGenres } from "../services/api";
import { Movie, Genre, MovieContextType } from "../lib/types";

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModalWithMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const [genresMap, setGenresMap] = useState<Record<number, string>>({});
  const [genresLoading, setGenresLoading] = useState(true);
  const [genresError, setGenresError] = useState<string | null>(null);

  // Favoriten in localStorage speichern
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const addToFavorites = (movie: Movie): void => {
    if (!isFavorite(movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId: number): void => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  // Genres laden
  useEffect(() => {
    const fetchGenresData = async () => {
      setGenresLoading(true);
      setGenresError(null);
      try {
        const genreList = await getGenres();
        const map: Record<number, string> = {};
        genreList.forEach((genre: Genre) => {
          map[genre.id] = genre.name;
        });
        setGenresMap(map);
      } catch (error) {
        console.error("Fehler beim Laden der Genres:", error);
        setGenresError("Failed to load genres");
      } finally {
        setGenresLoading(false);
      }
    };
    fetchGenresData();
  }, []);

  const value: MovieContextType = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    genresMap,
    genresLoading,
    genresError,
    showModal,
    selectedMovie,
    openModalWithMovie,
    closeModal,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;

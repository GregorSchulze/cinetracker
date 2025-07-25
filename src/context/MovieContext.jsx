import React, { createContext, useContext, useEffect, useState } from "react";
import { getGenres } from "../services/api";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [genresMap, setGenresMap] = useState({});
  const [genresLoading, setGenresLoading] = useState(true);
  const [genresError, setGenresError] = useState(null);

  // Favoriten in localStorage speichern
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorites = (movieId) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  // Genres laden
  useEffect(() => {
    const fetchGenresData = async () => {
      setGenresLoading(true);
      setGenresError(null);
      try {
        const genreList = await getGenres();
        const map = {};
        genreList.forEach((genre) => {
          map[genre.id] = genre.name;
        });
        setGenresMap(map);
      } catch (error) {
        console.error("Fehler beim Laden der Genres:", error);
      } finally {
        setGenresLoading(false);
      }
    };
    fetchGenresData();
  }, []);

  // Filmlänge laden

  const value = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFavorites,
    genresMap,
    genresLoading,
    genresError,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;

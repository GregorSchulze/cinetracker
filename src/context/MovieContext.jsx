import React, { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

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

  const value = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;

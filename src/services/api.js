const API_KEY = "22c9c721bbe7476fa6b5abfd42209252";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Api error:", error);
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Api error:", error);
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Api error:", error);
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Api error:", error);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details for ID ${movieId}:", error);
  }
};

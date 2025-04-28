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
    console.error("API Error:", error);
    throw error;
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
    console.error("API Error:", error);
    throw error;
  }
};

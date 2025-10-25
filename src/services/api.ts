const API_KEY = "22c9c721bbe7476fa6b5abfd42209252";
const BASE_URL = "https://api.themoviedb.org/3";
import { Movie, Video, Genre, MovieDetails } from "../lib/types";

// Alternative für für MovieApiResponse, VideoApiResponse & GenreApiResponse
// interface ApiResponse<T> {
//   results?: T[];
//   genre?: Genre[];
// }

interface MovieApiResponse {
  results: Movie[];
}

interface VideoApiResponse {
  results: Video[];
}

interface GenreApiResponse {
  genres: Genre[];
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data: MovieApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Api error:", error);
    return [];
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data: MovieApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Api error:", error);
    return [];
  }
};

export const getMovieVideos = async (movieId: number): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data: VideoApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Api error:", error);
    return [];
  }
};

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const data: GenreApiResponse = await response.json();
    return data.genres || [];
  } catch (error) {
    console.error("Api error:", error);
    return [];
  }
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details for ID ${movieId}:", error);
    return null;
  }
};

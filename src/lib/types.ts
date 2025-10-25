export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  video?: boolean;
  genre_ids?: number[];
  original_language?: string;
  popularity?: number;
  vote_count?: number;
  videos?: {
    results: Video[];
  };
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
  id: string;
  size?: number;
  official?: boolean;
  published_at?: string;
}

export interface Genre {
  id: number;
  name: string;
}

// Typ für erweiterte Film-Details, die von der Detail-API kommen
// Wird in ModalTrailer.tsx und api.ts verwendet
export interface MovieDetails extends Movie {
  runtime: number;
}

// Context Types
export interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  genresMap: Record<number, string>;
  genresLoading: boolean;
  genresError: string | null;
  showModal: boolean;
  selectedMovie: Movie | null;
  openModalWithMovie: (movie: Movie) => void;
  closeModal: () => void;
}

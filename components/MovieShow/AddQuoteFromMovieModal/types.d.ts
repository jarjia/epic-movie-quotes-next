import { Keys } from '@/types';

export type MovieShowTypes = {
  created_at: string;
  description: Keys;
  director: Keys;
  movie: Keys;
  id: number;
  genres: [
    {
      id: number;
      genre: Keys;
    }
  ];
  releaseDate: string;
  thumbnail: string;
  updated_at: string;
  user_id: number;
};
export type AddQuoteFromMovieModalTypes = {
  movie: MovieShowTypes;
  handleRefecthQuotes: () => void;
};

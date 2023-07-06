import { Keys } from '@/types';

export type Movie = {
  thumbnail: string;
  movie: Keys;
  releaseDate: string;
  id: number;
  quotes: {}[];
};

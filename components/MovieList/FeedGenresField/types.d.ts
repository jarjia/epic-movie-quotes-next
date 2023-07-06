import { Keys } from '@/types';

export type GenreField = {
  error: { genres: {} };
  defaultVal?: [
    {
      id: number;
      genre: Keys;
    }
  ];
};

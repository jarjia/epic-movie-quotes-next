import { Keys } from '@/types';

export type GenreFieldTypes = {
  error: { genres: {} };
  defaultVal?: [
    {
      id: number;
      genre: Keys;
    }
  ];
};

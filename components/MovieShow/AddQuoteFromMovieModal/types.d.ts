export type MovieShowTypes = {
  created_at: string;
  description: { en: string; ka: string };
  director: { en: string; ka: string };
  movie: { en: string; ka: string };
  id: number;
  genres: [
    {
      id: number;
      genre: { en: string; ka: string };
    }
  ];
  releaseDate: string;
  thumbnail: string;
  updated_at: string;
  user_id: number;
};

export type GenreObjectType = {
  id: number;
  genre: { en: string; ka: string };
};
export type GenreFieldTypes = {
  error: { genres: {} };
  defaultVal?: [
    {
      id: number;
      genre: { en: string; ka: string };
    }
  ];
};

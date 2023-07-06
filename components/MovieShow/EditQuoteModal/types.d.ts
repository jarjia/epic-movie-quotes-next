export type EditQuote = {
  quoteId: string | null;
  movieId: number;
};
export type EditQuoteState = {
  id: number;
  quote: Keys;
  thumbnail: string;
  movie_id: number;
};

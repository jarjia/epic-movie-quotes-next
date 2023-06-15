export type EditQuoteTypes = {
  quoteId: string | null;
  movieId: number;
  handleRefecthQuotes: () => void;
};
export type EditQuoteStateTypes = {
  id: number;
  quote: Keys;
  thumbnail: string;
  movie_id: number;
};

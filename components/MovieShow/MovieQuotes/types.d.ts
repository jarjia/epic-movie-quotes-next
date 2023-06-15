import { QuotesTypes } from '@/types';

export type MovieQuotesTypes = {
  movieImage: string;
  quotes: QuotesTypes[];
  handleRefecthQuotes: () => void;
};

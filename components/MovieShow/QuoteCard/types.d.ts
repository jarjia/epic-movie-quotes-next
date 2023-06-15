import { Keys } from '@/types';

export type QuoteCardTypes = {
  id: number;
  quote: Keys;
  thumbnail: string;
  handleRefecthQuotes: () => void;
  likesNumber: number;
  commentsNumber: number;
};

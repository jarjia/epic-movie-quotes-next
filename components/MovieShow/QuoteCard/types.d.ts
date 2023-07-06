import { Comment, Keys } from '@/types';

export type QuoteCard = {
  id: number;
  quote: Keys;
  thumbnail: string;
  likes: number[];
  comments: Comment[];
};

import { CommentTypes, Keys } from '@/types';

export type QuoteCardTypes = {
  id: number;
  quote: Keys;
  thumbnail: string;
  likes: number[];
  comments: CommentTypes[];
};

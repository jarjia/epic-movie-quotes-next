import { CommentTypes, Keys, likeTypes } from '@/types';

export type PostTypes = {
  thumbnail: string;
  quote: Keys;
  releaseDate: string;
  author: string;
  authorProfile: string;
  movie: Keys;
  id: number;
  comments: CommentTypes[];
  likes: likeTypes[];
};

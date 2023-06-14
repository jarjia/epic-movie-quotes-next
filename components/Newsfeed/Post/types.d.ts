import { Keys } from '@/types';

export type PostTypes = {
  thumbnail: string;
  quote: Keys;
  releaseDate: string;
  author: string;
  authorProfile: string;
  movie: Keys;
  id: number;
  comments: {
    id: number;
    comment: string;
    user: {
      name: string;
      thumbnail: string;
    };
  }[];
  likes: {
    id: number;
    user: {
      id: number;
    };
  }[];
};

export type Keys = {
  [key: string]: string;
};

export type HandleFormStatusTypes = {
  handleFormStatus: (status: string) => void;
};
export type LoginWithGoogleQueryTypes = {
  code: string;
  authUser: string;
  prompt: string;
  scope: string;
};

export type MobileInputTypes = {
  name: string;
  label: string;
  placeholder: string;
  isEdit: boolean;
  type: string;
};
export type UserDataTypes = {
  name: string;
  id: number;
  email: string;
  google_id: string;
  thumbnail?: string;
};
export type hookUserUpdateTypes = {
  handleEditProfileClear: () => void;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInputTypes;
};
export type MovieCreateTypes = {
  movie: Keys;
  description: Keys;
  director: Keys;
  releaseDate: string;
  thumbnail: {};
};
export type MovieStructureTypes = {
  id: number;
  releaseDate: string;
  thumbnail: string;
  movie: Keys;
  quotes: {}[];
};
export type MovieDescTypes = {
  created_at: string;
  description: Keys;
  director: Keys;
  movie: Keys;
  id: number;
  genres: [
    {
      id: number;
      genre: Keys;
    }
  ];
  releaseDate: string;
  thumbnail: string;
  updated_at: string;
  user_id: number;
};
export type PostQuoteTypes = {
  quote: Keys;
  movieId: number;
  thumbnail: {};
};
export type GenreObjectType = {
  id: number;
  genre: Keys;
};
export type likeTypes = {
  id: number;
  user: {
    id: number;
  };
};
export type CommentTypes = {
  id: number;
  comment: string;
  user: {
    id: number;
    name: string;
    thumbnail: string;
  };
};
export type MovieShowTypes = {
  created_at: string;
  description: Keys;
  director: Keys;
  movie: Keys;
  id: number;
  genres: [
    {
      id: number;
      genre: Keys;
    }
  ];
  releaseDate: string;
  thumbnail: string;
  updated_at: string;
  user_id: number;
};
export type QuotesTypes = {
  id: number;
  quote: Keys;
  thumbnail: string;
  movie_id: number;
  comments: CommentTypes[];
  likes: likeTypes[];
  movies: {
    user_id: number;
  };
};
export type UpdateQuotesTypes = {
  quote: Keys;
  movie_id: number;
  thumbnail: string;
};
export type PostsTypes = {
  id: number;
  quote: Keys;
  thumbnail: string;
  movie_id: number;
  movies: {
    movie: Keys;
    thumbnail: string;
    releaseDate: string;
    user: {
      name: string;
      thumbnail: string;
    };
    user_id: number;
  };
  comments: CommentTypes[];
  likes: likeTypes[];
};
export type NotificationTypes = {
  from: {
    name: string;
    thumbnail: string;
  };
  id: number;
  notification: string;
  seen: number;
  created_at: string;
  quote_id: number;
};
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
  user_id: number;
};

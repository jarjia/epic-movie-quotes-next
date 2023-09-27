export type Keys = {
  [key: string]: string;
};

export type HandleFormStatus = {
  handleFormStatus: (status: string) => void;
};

export type LoginWithGoogleQuery = {
  code: string;
  authUser: string;
  prompt: string;
  scope: string;
};

export type MobileInput = {
  name: string;
  label: string;
  placeholder: string;
  isEdit: boolean;
  type: string;
};

export type UserData = {
  name: string;
  id: number;
  email: string;
  google_id: string;
  thumbnail?: string;
  remember_token: string | null;
};

export type HookUserUpdate = {
  handleEditProfileClear: SetState<MobileEdit>;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInputTypes;
  handleIsSure: (bool: boolean) => void;
};

export type MovieCreate = {
  movie: Keys;
  description: Keys;
  director: Keys;
  releaseDate: string;
  thumbnail: {};
};

export type MovieStructure = {
  id: number;
  releaseDate: string;
  thumbnail: string;
  movie: Keys;
  quotes: Post[];
};

export type MovieDesc = {
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

export type PostQuote = {
  quote: Keys;
  movieId: number;
  thumbnail: {};
};

export type GenreObject = {
  id: number;
  genre: Keys;
};

export type Like = {
  id: number;
  user: {
    id: number;
  };
};

export type Comment = {
  id: number;
  quote_id: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    thumbnail: string;
  };
};

export type MovieShow = {
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
  quotes: QuotesTypes[];
};

export type Quotes = {
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

export type Post = {
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
  setModalWidth: SetState<number | null>;
  created_at: string;
};

export type UpdateQuotes = {
  quote: Keys;
  movie_id: number;
  thumbnail: string;
};

export type Posts = {
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
  created_at: string;
};

export type Notification = {
  from: {
    name: string;
    thumbnail: string;
    id: number;
  };
  id: number;
  notification: string;
  seen: number;
  created_at: string;
  quote_id: number;
  to_user: number;
};

export type PostEmailUpdate = {
  email: string;
  update_token: string;
  user_id: string;
  expires: string;
};

export type NewLike = {
  quoteId: number;
  likes: number[];
};

export type Search = {
  search: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type AppBars = {
  setShouldLogout: SetState<boolean>;
  setIsBurger: SetState<boolean>;
  isBurger?: boolean;
};

export type MobileEdit = {
  name: string;
  label: string;
  placeholder: string;
  isEdit: boolean;
  type: string;
};

import { Comment, NewLike, UserData } from '@/types';

export type Context = {
  setIsSearch: setState<boolean>;
  feedFormStatus: string | null;
  handleFeedFormStatus: (status: string) => void;
  setUserData: setState<UserData>;
  handleCurrentQuoteId: (quoteId: string | null) => void;
  userData: UserData;
  isSearch: boolean;
  currentQuoteId: string | null;
  newLikes: NewLike[] | null;
  commentsArr: null | Comment[];
  handleNewLikes: (likes: NewLike | null) => void;
  handleNewComment: (comment: Comment | null) => void;
};

import { Comment, NewLike, UserData, SetState } from '@/types';

export type Context = {
  setIsSearch: SetState<boolean>;
  feedFormStatus: string | null;
  handleFeedFormStatus: (status: string) => void;
  setUserData: SetState<UserData>;
  handleCurrentQuoteId: (quoteId: string | null) => void;
  userData: UserData;
  isSearch: boolean;
  currentQuoteId: string | null;
  newLikes: NewLike[] | null;
  commentsArr: null | Comment[];
  handleNewLikes: (likes: NewLike | null) => void;
  handleNewComment: (comment: Comment | null) => void;
  handleFriend: (data: { to: number; status: string }) => void;
  friendData: FriendData | null;
  setFriendData: SetState<null | FriendData>;
};

export type FriendData = {
  status: string;
  from: number;
};

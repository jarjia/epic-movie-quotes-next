import { Comment } from '@/types';

export type FeedLayout = {
  children: JSX.Element;
};
export type NotificationEvent = {
  notification: {
    notify: boolean;
  };
};
export type LikeEvent = {
  message: {
    quoteId: number;
    likes: number[];
  };
};
export type CommentEvent = {
  message: {
    new_comment: Comment;
  };
};

export type OnlineUser = {
  id: number;
  name: string;
};
export type Friend = {
  friend: {
    to: number;
    activity: boolean;
    refetchFriends: boolean;
  };
};

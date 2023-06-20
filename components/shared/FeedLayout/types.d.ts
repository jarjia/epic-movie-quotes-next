import { CommentTypes } from '@/types';

export type FeedLayoutTypes = {
  children: JSX.Element;
};
export type NotificationEventTypes = {
  notification: {
    notify: boolean;
  };
};
export type LikeEventTypes = {
  message: {
    likes: number[];
  };
};
export type CommentEventTypes = {
  message: {
    new_comment: CommentTypes;
  };
};

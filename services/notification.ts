import axios from './axios';
import { PostCommentTypes } from './types';

const useNotificationService = () => {
  const postComment = (data: PostCommentTypes) => {
    return axios.post('/api/comment/create', data);
  };

  const postLike = (quoteId: number) => {
    return axios.post('/api/like/create', {
      quoteId,
    });
  };

  return {
    postComment,
    postLike,
  };
};

export default useNotificationService;

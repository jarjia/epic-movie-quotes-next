import axios from './axios';
import { PostCommentTypes } from './types';

const useNotificationService = () => {
  const postComment = (data: PostCommentTypes) => {
    return axios.post('/api/comment/create', data);
  };

  const postLike = (data: { quoteId: number; to_user: number }) => {
    return axios.post('/api/like/create', data);
  };

  const getNotifications = (paginate: number) => {
    return axios.get('/api/notifications', {
      params: { paginate },
    });
  };

  const getNotificationsCount = () => {
    return axios.get('/api/notifications/count');
  };

  const readAllNotifications = () => {
    return axios.post('/api/notifications/read-all');
  };

  const readNotification = (notifyId: number) => {
    return axios.patch(`/api/read/notification/${notifyId}`);
  };

  return {
    postComment,
    getNotifications,
    getNotificationsCount,
    postLike,
    readNotification,
    readAllNotifications,
  };
};

export default useNotificationService;

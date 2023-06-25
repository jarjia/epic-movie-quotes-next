import axios from './axios';
import { PostCommentTypes } from './types';

const useNotificationService = () => {
  const postComment = (data: PostCommentTypes) => {
    return axios.post('/api/comment/create', data);
  };

  const postLike = (data: { quoteId: number; to_user: number }) => {
    return axios.post('/api/like/create', data);
  };

  const getNotifications = (paginate: number, filter: string) => {
    return axios.get('/api/notifications', {
      params: { paginate, filter },
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

  const postBroadcasting = (data: any) => {
    return axios.post('/broadcasting/auth', {
      socket_id: data.socketId,
      channel_name: data.channelName,
    });
  };

  return {
    postBroadcasting,
    postComment,
    getNotifications,
    getNotificationsCount,
    postLike,
    readNotification,
    readAllNotifications,
  };
};

export default useNotificationService;

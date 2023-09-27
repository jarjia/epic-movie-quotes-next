import { useContext } from 'react';
import axios from './axios';
import { AppContext } from '@/context';
import { AcceptFriend, RejectFriend } from './types';

const useFriendService = () => {
  const { userData } = useContext(AppContext);

  const addFriend = (to_id: number) => {
    return axios.post('/api/friend/add', {
      to_id,
      from_id: userData.id,
    });
  };

  const rejectFriend = (data: RejectFriend) => {
    return axios.post('/api/friend/reject', {
      friend_id: data.friend_id,
      not_id: data.not_id,
    });
  };

  const acceptFriend = (data: AcceptFriend) => {
    return axios.post('/api/friend/accept', {
      friend_id: data.friend_id,
      not_id: data.not_id,
      sender_id: data.sender_id,
    });
  };

  const getUsersFriends = () => {
    return axios.get('/api/friend/index');
  };

  return {
    getUsersFriends,
    addFriend,
    acceptFriend,
    rejectFriend,
  };
};

export default useFriendService;

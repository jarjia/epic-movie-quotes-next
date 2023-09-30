import { AppContext } from '@/context';
import { useFriendService } from '@/services';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { FriendProp, Status } from './types';
import { useTranslation } from 'next-i18next';

const useFriend = (data: FriendProp) => {
  const queryClient = useQueryClient();
  const { addFriend, rejectFriend, acceptFriend } = useFriendService();
  const { userData } = useContext(AppContext);
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [isButtonDisabled] = useState(false);
  const { t } = useTranslation('social');

  useEffect(() => {
    let statusFriends = data.friends
      .map((friend) => {
        return {
          id: friend.id,
          status: friend.pivot.status,
          from_id: friend.pivot.from_user,
          friend_id: friend.pivot.friend_id,
        };
      })
      .find((prev) => prev.id === userData.id);

    setStatus(statusFriends);
  }, [data.friends, userData.id]);

  const refetchFriends = () => {
    return setTimeout(() => {
      queryClient.invalidateQueries('users-for-friends');
    }, 300);
  };

  const refetchUserFriends = () => {
    return setTimeout(() => {
      queryClient.invalidateQueries('friends');
    }, 1000);
  };

  const { mutate: addFriendMutate } = useMutation(addFriend);

  const { mutate: rejectFriendMutation, isLoading: rejectLoading } =
    useMutation(rejectFriend);

  const { mutate: acceptFriendMutation, isLoading: acceptLoading } =
    useMutation(acceptFriend);

  return {
    acceptLoading,
    refetchFriends,
    userData,
    rejectLoading,
    acceptFriendMutation,
    rejectFriendMutation,
    addFriendMutate,
    refetchUserFriends,
    status,
    isButtonDisabled,
    setStatus,
    t,
  };
};

export default useFriend;

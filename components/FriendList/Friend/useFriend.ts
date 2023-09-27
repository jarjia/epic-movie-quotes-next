import { AppContext } from '@/context';
import { useFriendService } from '@/services';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const useFriend = () => {
  const queryClient = useQueryClient();
  const { addFriend, rejectFriend, acceptFriend } = useFriendService();
  const { userData } = useContext(AppContext);

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
  };
};

export default useFriend;

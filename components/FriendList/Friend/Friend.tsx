import { FriendIcon, PendingIcon } from '@/components';
import { Friend, Status } from './types';
import useFriend from './useFriend';
import { useEffect, useState } from 'react';

const Friend: React.FC<Friend> = ({ data }) => {
  const {
    acceptFriendMutation,
    acceptLoading,
    refetchFriends,
    rejectFriendMutation,
    addFriendMutate,
    rejectLoading,
    refetchUserFriends,
    userData,
  } = useFriend();
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [isButtonDisabled] = useState(false);

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

  return (
    <div className='flex sm-max:flex-col sm-max:rounded-2xl my-2 bg-transparent justify-between rounded-full friend-inst-class p-1 pl-2 py-2'>
      <div className='flex items-center'>
        <div
          className='w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url("${data.thumbnail}")`,
          }}
        ></div>
        <p className='text-white text-font-base pl-3'>{data.name}</p>
      </div>
      <div
        className={`flex sm-max:m-2 select-none items-center rounded-full bg-blue-700 ${
          status === undefined || status!.status === 'friends'
            ? 'hover:bg-blue-800'
            : ''
        }`}
      >
        {status === undefined ? (
          <button
            disabled={isButtonDisabled}
            className='h-full text-white sm-max:w-full capitalize px-2'
            onClick={() => {
              addFriendMutate(data.id);
              setStatus((prev) => {
                return { ...(prev as Status), status: 'pending' };
              });
              refetchFriends();
            }}
          >
            add friend
          </button>
        ) : status!.status === 'pending' ? (
          <p className='flex items-center sm-max:w-full text-white capitalize gap-1 px-2'>
            <PendingIcon /> request sent
          </p>
        ) : status!.status === 'recieved' ? (
          <div className='flex h-full sm-max:w-full text-white'>
            <button
              disabled={rejectLoading || acceptLoading || isButtonDisabled}
              onClick={() => {
                acceptFriendMutation({
                  friend_id: status!.friend_id,
                  sender_id: status!.from_id,
                });
                setStatus((prev) => {
                  return { ...(prev as Status), status: 'friends' };
                });
                refetchFriends();
                refetchUserFriends();
              }}
              className='text-base sm-max:w-full bg-blue-700 hover:bg-blue-800 rounded-l-full px-2 py-1'
            >
              Accept
            </button>
            <button
              disabled={rejectLoading || acceptLoading || isButtonDisabled}
              onClick={() => {
                rejectFriendMutation({
                  friend_id: status!.from_id,
                });
                setStatus(undefined);
                refetchFriends();
              }}
              className='text-base sm-max:w-full bg-red-700 hover:bg-red-800 rounded-r-full px-2 py-1'
            >
              Reject
            </button>
          </div>
        ) : (
          <button
            className='flex h-full sm-max:w-full items-center gap-2 text-white capitalize px-2'
            disabled={rejectLoading || acceptLoading || isButtonDisabled}
            onClick={() => {
              rejectFriendMutation({
                friend_id: status!.from_id,
                unfriend: true,
              });
              setStatus(undefined);
              refetchFriends();
              refetchUserFriends();
            }}
          >
            <FriendIcon isFriends={false} /> unfriend
          </button>
        )}
      </div>
    </div>
  );
};

export default Friend;

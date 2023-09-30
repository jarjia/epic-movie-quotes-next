import { FriendIcon, PendingIcon } from '@/components';
import { Friend, Status } from './types';
import useFriend from './useFriend';

const Friend: React.FC<Friend> = ({ data }) => {
  const {
    acceptFriendMutation,
    acceptLoading,
    refetchFriends,
    rejectFriendMutation,
    t,
    addFriendMutate,
    rejectLoading,
    refetchUserFriends,
    setStatus,
    status,
    isButtonDisabled,
  } = useFriend(data);

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
            {t('add_friend')}
          </button>
        ) : status!.status === 'pending' ? (
          <p className='flex items-center sm-max:w-full text-white capitalize gap-1 px-2'>
            <PendingIcon /> {t('request_sent')}
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
              {t('accept')}
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
              {t('reject')}
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
            <FriendIcon isFriends={false} /> {t('unfriend')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Friend;

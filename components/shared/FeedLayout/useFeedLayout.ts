import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  CommentEvent,
  Friend,
  LikeEvent,
  NotificationEvent,
  OnlineUser,
} from './types';
import { PusherChannel } from 'laravel-echo/dist/channel';
import { useInstantiatePusher } from '@/hooks';
import { UserData } from '@/types';
import useFriendService from '@/services/friendService';
import { useTranslation } from 'next-i18next';

const useFeedLayout = () => {
  const { getUsersFriends } = useFriendService();
  const { getUserData, getLogoutUser } = useAuthService();
  useInstantiatePusher();
  const {
    feedFormStatus,
    setUserData,
    handleNewLikes,
    userData,
    handleFeedFormStatus,
    handleNewComment,
  } = useContext(AppContext);
  const [shouldLogout, setShouldLogout] = useState(false);
  const { t } = useTranslation('newsfeed');
  const [isBurger, setIsBurger] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const { isLoading, isError } = useQuery('user', getUserData, {
    onSuccess(data) {
      if (data?.data?.remember_token !== null) {
        localStorage.setItem('remember_me', 'true');
      } else {
        localStorage.removeItem('remember_me');
      }
      setUserData(data.data);
    },
    onError: (err: any) => {
      if (err?.response?.status === 403 || err?.response?.status === 401) {
        router.push('/403');
      }
      localStorage.removeItem('remember_me');
    },
    enabled: userData.id === 0,
  });
  const { data } = useQuery('friends', getUsersFriends);
  useQuery('log-out', getLogoutUser, {
    onSuccess: () => {
      localStorage.removeItem('remember_me');
      queryClient.removeQueries('log-out');
      setShouldLogout(false);
      queryClient.invalidateQueries('user');
      window.location.pathname = '/';
    },
    enabled: shouldLogout,
  });

  useEffect(() => {
    if (feedFormStatus !== '') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [feedFormStatus]);

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.private(
        `notification.${userData.id}`
      ) as PusherChannel;
      channel!.listen('NotificationEvent', (data: NotificationEvent) => {
        if (data.notification.notify) {
          setTimeout(() => {
            queryClient.invalidateQueries('notifications');
            queryClient.invalidateQueries('notifications-count', {
              refetchInactive: true,
            });
          }, 500);
        }
      });
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [userData.id, queryClient]);

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.private(`friend.${userData.id}`) as PusherChannel;
      channel!.listen('FriendEvent', (data: Friend) => {
        if (data.friend.activity) {
          if (data.friend.refetchFriends) {
            queryClient.invalidateQueries('friends');
          }
          queryClient.invalidateQueries('users-for-friends');
        }
      });
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [userData.id, queryClient]);

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.channel('liked') as PusherChannel;
      channel!.listen('QuoteLiked', (data: LikeEvent) =>
        handleNewLikes(data.message)
      );
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.channel('commented') as PusherChannel;
      channel!.listen('QuoteComment', (data: CommentEvent) =>
        handleNewComment(data.message.new_comment)
      );
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    const online = window.Echo.join('online');

    const handleMemberJoin = (member: OnlineUser) => {
      setOnlineUsers((prev: OnlineUser[]) => {
        if (prev.find((item) => item.id === member.id) === undefined) {
          return [member, ...prev];
        }
        return prev;
      });
    };

    const handleMemberLeave = (member: OnlineUser) => {
      setOnlineUsers((prev) =>
        prev.filter((item: OnlineUser) => item.id !== member.id)
      );
    };

    online.here((members: OnlineUser[]) => {
      setOnlineUsers(members);
    });

    online.joining(handleMemberJoin);
    online.leaving(handleMemberLeave);
  }, [onlineUsers]);

  return {
    feedFormStatus,
    setShouldLogout,
    setIsBurger,
    router,
    t,
    isLoading,
    isError,
    handleFeedFormStatus,
    users: data?.data as UserData[],
    onlineUsers,
    isBurger,
  };
};

export default useFeedLayout;

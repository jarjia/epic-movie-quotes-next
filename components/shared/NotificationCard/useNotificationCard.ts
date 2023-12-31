import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import useFriendService from '@/services/friendService';
import { formatDistanceToNow } from 'date-fns';
import { ka, enUS } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';

const useNotificationCard = (ago: string) => {
  const { t } = useTranslation('common');
  const { rejectFriend, acceptFriend } = useFriendService();
  const { readNotification } = useNotificationService();
  const date = useMemo(() => new Date(ago), [ago]);
  const router = useRouter();
  let locale = router.locale === 'en' ? enUS : ka;
  const { handleFeedFormStatus, handleCurrentQuoteId } = useContext(AppContext);
  const queryClient = useQueryClient();
  let initialTimeAgo = formatDistanceToNow(date, { locale });
  if (router.locale === 'ka') {
    initialTimeAgo = initialTimeAgo.replace('თვე', 'თვი');
    initialTimeAgo = initialTimeAgo.replace('დღე', 'დღი');
    initialTimeAgo = initialTimeAgo.replace('წელი', 'წლი');
  }
  const [timePassed, setTimePassed] = useState(initialTimeAgo);
  const { mutate: readNotificationMutate } = useMutation(readNotification, {
    onSuccess() {
      queryClient.invalidateQueries('notifications-count', {
        refetchInactive: true,
      });
      queryClient.invalidateQueries('notifications');
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let timeAgo = formatDistanceToNow(date, { locale });
      if (router.locale === 'ka') {
        timeAgo = timeAgo.replace('თვე', 'თვი');
        timeAgo = timeAgo.replace('დღე', 'დღი');
        timeAgo = timeAgo.replace('წელი', 'წლი');
      }
      setTimePassed(timeAgo);
    }, 1000);

    return () => clearInterval(interval);
  }, [date, locale, router.locale]);

  const { mutate: rejectFriendMutation, isLoading: rejectLoading } =
    useMutation(rejectFriend, {
      onSuccess(res) {
        console.log(res);
      },
    });

  const { mutate: acceptFriendMutation, isLoading: acceptLoading } =
    useMutation(acceptFriend);

  const refetchUserFriends = () => {
    return setTimeout(() => {
      queryClient.invalidateQueries('friends');
    }, 1000);
  };

  return {
    readNotification,
    refetchUserFriends,
    timePassed,
    readNotificationMutate,
    handleFeedFormStatus,
    rejectFriendMutation,
    acceptLoading,
    acceptFriendMutation,
    rejectLoading,
    t,
    curLocale: router.locale,
    handleCurrentQuoteId,
  };
};

export default useNotificationCard;

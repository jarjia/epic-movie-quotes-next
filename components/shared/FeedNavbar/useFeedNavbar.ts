import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { errorToast } from '@/helpers';

const useFeedNavbar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { t: apiErrors } = useTranslation('apiErrors');
  const { getNotificationsCount } = useNotificationService();
  const [isNotification, setIsNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(null);
  const { setIsSearch } = useContext(AppContext);
  const { data } = useQuery('notifications-count', getNotificationsCount, {
    onError(err: any) {
      if (err?.response?.status === 403 || err?.response?.status === 401) {
        router.push('/403');
      }
      if (err?.response.status === 429) {
        errorToast(apiErrors, apiErrors('too_many_requests'), err);
      }
      localStorage.removeItem('remember_me');
    },
  });

  useEffect(() => {
    setNotificationCount(data?.data.new);
  }, [data?.data.new]);

  return {
    setIsNotification,
    notSeenNotifications: notificationCount,
    isNotification,
    t,
    setIsSearch,
    router,
  };
};

export default useFeedNavbar;

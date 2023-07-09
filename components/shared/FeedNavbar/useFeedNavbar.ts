import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';

const useFeedNavbar = () => {
  const router = useRouter();
  const { getNotificationsCount } = useNotificationService();
  const [isNotification, setIsNotification] = useState(false);
  const { setIsSearch, notificationCount, setNotificationCount } =
    useContext(AppContext);
  useQuery('notifications-count', getNotificationsCount, {
    onSuccess(data) {
      setNotificationCount(data?.data.new);
    },
    keepPreviousData: true,
    enabled: notificationCount === null,
  });
  const { t } = useTranslation('common');

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

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
  const [shouldNotify, setShouldNotify] = useState(false);
  const { setIsSearch } = useContext(AppContext);
  const { data } = useQuery('notifications-count', getNotificationsCount, {
    onSuccess() {
      setShouldNotify(true);
    },
  });
  const notSeenNotifications = data?.data.new;
  const { t } = useTranslation('common');

  return {
    setIsNotification,
    notSeenNotifications,
    shouldNotify,
    isNotification,
    t,
    setIsSearch,
    router,
  };
};

export default useFeedNavbar;

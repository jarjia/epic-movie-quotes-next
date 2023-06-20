import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

const useFeedNavbar = () => {
  const router = useRouter();
  const { getNotificationsCount } = useNotificationService();
  const [isNotification, setIsNotification] = useState(false);
  const { handleIsBurger, handleIsSearch, isSearch, handleShouldLogout } =
    useContext(AppContext);
  const { data } = useQuery('notifications-count', getNotificationsCount);
  const notSeenNotifications = data?.data.new;

  const handleisNotification = () => {
    setIsNotification(!isNotification);
  };

  return {
    handleShouldLogout,
    handleisNotification,
    notSeenNotifications,
    isNotification,
    isSearch,
    handleIsSearch,
    handleIsBurger,
    router,
  };
};

export default useFeedNavbar;

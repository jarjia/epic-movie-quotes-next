import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const useFeedNavbar = () => {
  const router = useRouter();
  const [isNotification, setIsNotification] = useState(false);
  const { handleIsBurger, handleIsSearch, isSearch, handleShouldLogout } =
    useContext(AppContext);

  const handleisNotification = () => {
    setIsNotification(!isNotification);
  };

  return {
    handleShouldLogout,
    handleisNotification,
    isNotification,
    isSearch,
    handleIsSearch,
    handleIsBurger,
    router,
  };
};

export default useFeedNavbar;

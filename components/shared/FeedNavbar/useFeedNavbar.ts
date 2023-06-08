import { AppContext } from '@/context';
import { getLogoutUser } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useQueryClient } from 'react-query';

const useFeedNavbar = () => {
  const router = useRouter();
  const query = useQueryClient();
  const [isNotification, setIsNotification] = useState(false);
  const { handleIsBurger, handleIsSearch, isSearch } = useContext(AppContext);

  const handleisNotification = () => {
    setIsNotification(!isNotification);
  };

  const handleLogout = async () => {
    try {
      const res = await getLogoutUser();
      if (res.status === 200) {
        router.push('/');
        query.removeQueries('user-data');
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleLogout,
    handleisNotification,
    isNotification,
    isSearch,
    handleIsSearch,
    handleIsBurger,
    router,
  };
};

export default useFeedNavbar;

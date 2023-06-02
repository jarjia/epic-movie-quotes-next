import { getLogoutUser } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

const useFeedNavbar = () => {
  const router = useRouter();
  const query = useQueryClient();
  const [isNotification, setIsNotification] = useState(false);

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
  };
};

export default useFeedNavbar;

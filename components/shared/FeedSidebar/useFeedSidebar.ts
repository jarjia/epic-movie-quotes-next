import { getLogoutUser } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

const useFeedSidebar = () => {
  const router = useRouter();
  const query = useQueryClient();
  const [dropDown, setDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await getLogoutUser();
      if (res.status === 200) {
        router.push('/');
        query.removeQueries('user-data');
        localStorage.removeItem('auth');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropDown = () => {
    setDropdown(!dropDown);
  };

  return {
    handleLogout,
    dropDown,
    router,
    handleDropDown,
  };
};

export default useFeedSidebar;

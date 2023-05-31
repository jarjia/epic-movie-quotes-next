import { getLogoutUser, getUserData } from '@/services';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const useFeed = () => {
  const { data } = useQuery('user-data', getUserData);
  const router = useRouter();
  const query = useQueryClient();

  useEffect(() => {
    if (localStorage.getItem('auth') === null) {
      router.push('/403');
    } else {
      sessionStorage.clear();
    }
  }, [router]);

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
    data,
    handleLogout,
  };
};

export default useFeed;

import { getLogoutUser, getUserData } from '@/services';
import { createContext, useEffect, useState } from 'react';
import { UserDataTypes } from '@/types';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';

export const AppContext = createContext({
  feedFormStatus: '' as string | null,
  handleFeedFormStatus: (status: string) => {},
  userData: {} as UserDataTypes,
  handleIsBurger: () => {},
  handleIsSearch: () => {},
  handleIsNotBurger: () => {},
  isBurger: false,
  isSearch: false,
  shouldRefetch: false,
  handleRefetch: () => {},
  handleShouldLogout: () => {},
});

const AppContextProvider: React.FC<{ children: JSX.Element }> = (props) => {
  const [feedFormStatus, setFeedFormStatus] = useState<string | null>('');
  const [userData, setUserData] = useState({
    name: '',
    id: 0,
    email: '',
    email_verified_at: '',
    created_at: '',
    updated_at: '',
    google_id: '',
    thumbnail: '',
  });
  const [isBurger, setIsBurger] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);
  const query = useQueryClient();
  const router = useRouter();
  useQuery('log-out', getLogoutUser, {
    onSuccess: () => {
      router.push('/');
      query.removeQueries('log-out');
      localStorage.removeItem('auth');
    },
    enabled: shouldLogout,
  });

  const handleShouldLogout = () => {
    setShouldLogout(true);
  };

  const handleRefetch = () => {
    setShouldRefetch(true);
  };

  const handleIsSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleIsBurger = () => {
    setIsBurger(true);
  };

  const handleIsNotBurger = () => {
    setIsBurger(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem('feed-form-status') === ('' || null)) {
      setFeedFormStatus('');
    } else {
      setFeedFormStatus(sessionStorage.getItem('feed-form-status'));
    }
    const getUser = async () => {
      try {
        const res = await getUserData();
        setUserData(res.data);
      } catch (error) {
        localStorage.removeItem('auth');
        router.push('/403');
      }
    };
    if (
      router.pathname === '/newsfeed' ||
      router.pathname === '/profile' ||
      router.pathname === '/movie-list'
    ) {
      getUser();
    }
  }, [router]);

  const handleFeedFormStatus = (status: string) => {
    sessionStorage.setItem('feed-form-status', status);
    setFeedFormStatus(status);
  };

  const contextValue = {
    userData,
    feedFormStatus,
    handleFeedFormStatus,
    handleIsBurger,
    handleIsSearch,
    isBurger,
    isSearch,
    handleIsNotBurger,
    shouldRefetch,
    handleRefetch,
    handleShouldLogout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

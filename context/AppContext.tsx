import { getUserData } from '@/services';
import { createContext, useEffect, useState } from 'react';
import { UserDataTypes } from './types';
import { useRouter } from 'next/router';

export const AppContext = createContext({
  feedFormStatus: '' as string | null,
  handleFeedFormStatus: (status: string) => {},
  userData: {} as UserDataTypes,
  handleIsBurger: () => {},
  handleIsSearch: () => {},
  isBurger: false,
  isSearch: false,
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
    thumbnail: '',
  });
  const [isBurger, setIsBurger] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const router = useRouter();

  const handleIsSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleIsBurger = () => {
    setIsBurger(!isBurger);
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
        localStorage.clear();
        router.push('/403');
      }
    };
    if (
      router.asPath === '/newsfeed' ||
      router.asPath === '/profile' ||
      router.asPath === '/movie-list'
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
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

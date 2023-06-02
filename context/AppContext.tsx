import { getUserData } from '@/services';
import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { UserDataTypes } from './types';
import { useRouter } from 'next/router';

export const AppContext = createContext({
  feedFormStatus: '' as string | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleFeedFormStatus: (status: string) => {},
  userData: {} as UserDataTypes,
  handleIsBurger: () => {},
  handleIsSearch: () => {},
  isBurger: false as boolean,
  isSearch: false as boolean,
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
  const { data } = useQuery('user-data', getUserData);
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
    if (data?.statusText === 'OK') {
      setUserData(data?.data);
    } else if (data?.statusText === 'Unauthorized') {
      localStorage.clear();
      router.push('/403');
    }
  }, [data, router]);

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

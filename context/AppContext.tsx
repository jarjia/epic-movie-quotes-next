import { useAuthService } from '@/services';
import { createContext, useEffect, useState } from 'react';
import { UserDataTypes } from '@/types';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';

export const AppContext = createContext({
  feedFormStatus: '' as string | null,
  handleFeedFormStatus: (status: string) => {},
  handleUserData: (data: UserDataTypes) => {},
  handleCurrentQuoteId: (quoteId: string | null) => {},
  userData: {} as UserDataTypes,
  handleIsBurger: () => {},
  handleIsSearch: () => {},
  handleIsNotBurger: () => {},
  isBurger: false,
  isSearch: false,
  shouldRefetch: false,
  handleRefetch: () => {},
  handleShouldLogout: () => {},
  currentQuoteId: null as string | null,
});

const AppContextProvider: React.FC<{ children: JSX.Element }> = (props) => {
  const [feedFormStatus, setFeedFormStatus] = useState<string | null>('');
  const [userData, setUserData] = useState<UserDataTypes>({
    name: '',
    id: 0,
    email: '',
    google_id: '',
    thumbnail: '',
  });
  const [isBurger, setIsBurger] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);
  const [currentQuoteId, setCurrentQuoteId] = useState<string | null>(null);
  const query = useQueryClient();
  const router = useRouter();
  const { getLogoutUser } = useAuthService();
  useQuery('log-out', getLogoutUser, {
    onSuccess: () => {
      router.push('/');
      query.removeQueries('log-out');
      localStorage.removeItem('auth');
      setShouldLogout(false);
    },
    enabled: shouldLogout,
  });

  const handleShouldLogout = () => {
    setShouldLogout(true);
  };

  const handleCurrentQuoteId = (quoteId: string | null) => {
    setCurrentQuoteId(quoteId);
    sessionStorage.setItem('quoteId', JSON.stringify(quoteId));
  };

  const handleRefetch = () => {
    setShouldRefetch((prev) => !prev);
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

  const handleUserData = (data: UserDataTypes) => {
    setUserData(data);
  };

  useEffect(() => {
    setCurrentQuoteId(JSON.parse(sessionStorage.getItem('quoteId') || 'null'));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('feed-form-status') === ('' || null)) {
      setFeedFormStatus('');
    } else {
      setFeedFormStatus(sessionStorage.getItem('feed-form-status'));
    }
  }, [router]);

  const handleFeedFormStatus = (status: string) => {
    sessionStorage.setItem('feed-form-status', status);
    setFeedFormStatus(status);
    if (status !== '') {
      window.scrollTo({
        top: 0,
      });
    }
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
    handleUserData,
    currentQuoteId,
    handleCurrentQuoteId,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

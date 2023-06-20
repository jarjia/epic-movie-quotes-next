import { useAuthService } from '@/services';
import { createContext, useEffect, useState } from 'react';
import { CommentTypes, UserDataTypes } from '@/types';
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
  handleShouldLogout: () => {},
  currentQuoteId: null as string | null,
  newLikes: null as number[] | null,
  comment: null as null | CommentTypes,
  handleNewLikes: (likes: number[] | null) => {},
  handleNewComment: (comment: CommentTypes | null) => {},
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
  const [shouldLogout, setShouldLogout] = useState(false);
  const [newLikes, setNewLikes] = useState<number[] | null>(null);
  const [comment, setComment] = useState<CommentTypes | null>(null);
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

  const handleNewLikes = (likes: number[] | null) => {
    setNewLikes(likes);
  };

  const handleNewComment = (comment: CommentTypes | null) => {
    setComment(null);
    setComment(comment);
  };

  const handleShouldLogout = () => {
    setShouldLogout(true);
  };

  const handleCurrentQuoteId = (quoteId: string | null) => {
    setCurrentQuoteId(quoteId);
    sessionStorage.setItem('quoteId', JSON.stringify(quoteId));
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
    handleShouldLogout,
    handleUserData,
    currentQuoteId,
    handleCurrentQuoteId,
    newLikes,
    comment,
    handleNewLikes,
    handleNewComment,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

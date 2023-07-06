import { useAuthService } from '@/services';
import { createContext, useEffect, useState } from 'react';
import { Comment, NewLike, UserData } from '@/types';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';

export const AppContext = createContext({
  feedFormStatus: '' as string | null,
  handleFeedFormStatus: (status: string) => {},
  handleUserData: (data: UserData) => {},
  handleCurrentQuoteId: (quoteId: string | null) => {},
  userData: {} as UserData,
  handleIsBurger: () => {},
  handleIsSearch: () => {},
  handleIsNotBurger: () => {},
  isBurger: false,
  isSearch: false,
  handleShouldLogout: () => {},
  currentQuoteId: null as string | null,
  newLikes: null as NewLike[] | null,
  commentsArr: null as null | Comment[],
  handleNewLikes: (likes: NewLike | null) => {},
  handleNewComment: (comment: Comment | null) => {},
});

const AppContextProvider: React.FC<{ children: JSX.Element }> = (props) => {
  const [feedFormStatus, setFeedFormStatus] = useState<string | null>('');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    id: 0,
    email: '',
    google_id: '',
    thumbnail: '',
  });
  const [isBurger, setIsBurger] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);
  const [newLikes, setNewLikes] = useState<NewLike[] | null>(null);
  const [commentsArr, setCommentsArr] = useState<Comment[] | null>(null);
  const [currentQuoteId, setCurrentQuoteId] = useState<string | null>(null);
  const query = useQueryClient();
  const router = useRouter();
  const { getLogoutUser } = useAuthService();
  useQuery('log-out', getLogoutUser, {
    onSuccess: () => {
      router.push('/');
      localStorage.removeItem('remember_me');
      query.removeQueries('log-out');
      setShouldLogout(false);
      query.invalidateQueries('user');
    },
    enabled: shouldLogout,
  });

  const handleNewLikes = (likes: NewLike | null) => {
    setNewLikes((prev) => {
      if (prev === null) {
        return likes !== null ? [likes] : null;
      } else {
        return likes !== null ? [...prev, likes] : prev;
      }
    });
  };

  const handleNewComment = (comment: Comment | null) => {
    setCommentsArr((prev) => {
      if (prev === null) {
        return comment !== null ? [comment] : null;
      } else {
        return comment !== null ? [...prev, comment] : prev;
      }
    });
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

  const handleUserData = (data: UserData) => {
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
    commentsArr,
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

import { createContext, useEffect, useState } from 'react';
import { Comment, NewLike, UserData } from '@/types';
import { useRouter } from 'next/router';

export const AppContext = createContext({
  feedFormStatus: '' as string | null,
  handleFeedFormStatus: (status: string) => {},
  handleUserData: (data: UserData) => {},
  handleCurrentQuoteId: (quoteId: string | null) => {},
  userData: {} as UserData,
  handleIsSearch: () => {},
  isSearch: false,
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
  const [isSearch, setIsSearch] = useState(false);
  const [newLikes, setNewLikes] = useState<NewLike[] | null>(null);
  const [commentsArr, setCommentsArr] = useState<Comment[] | null>(null);
  const [currentQuoteId, setCurrentQuoteId] = useState<string | null>(null);
  const router = useRouter();

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

  const handleCurrentQuoteId = (quoteId: string | null) => {
    setCurrentQuoteId(quoteId);
    sessionStorage.setItem('quoteId', JSON.stringify(quoteId));
  };

  const handleIsSearch = () => {
    setIsSearch(!isSearch);
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
    handleIsSearch,
    isSearch,
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

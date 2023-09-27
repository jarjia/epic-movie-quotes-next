import { createContext, useEffect, useState } from 'react';
import { Comment, NewLike, UserData } from '@/types';
import { useRouter } from 'next/router';
import { Context, FriendData } from './types';

const initialUserData = {
  name: '',
  id: 0,
  email: '',
  google_id: '',
  thumbnail: '',
  remember_token: null,
};

export const AppContext = createContext<Context>({
  feedFormStatus: '',
  handleFeedFormStatus: () => {},
  setUserData: () => {},
  handleCurrentQuoteId: () => {},
  userData: initialUserData,
  setIsSearch: () => {},
  isSearch: false,
  currentQuoteId: null,
  newLikes: null,
  commentsArr: null,
  handleNewLikes: () => {},
  handleNewComment: () => {},
  handleFriend: () => {},
  friendData: null,
  setFriendData: () => {},
});

const AppContextProvider: React.FC<{ children: JSX.Element }> = (props) => {
  const [feedFormStatus, setFeedFormStatus] = useState<string | null>('');
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isSearch, setIsSearch] = useState(false);
  const [newLikes, setNewLikes] = useState<NewLike[] | null>(null);
  const [commentsArr, setCommentsArr] = useState<Comment[] | null>(null);
  const [currentQuoteId, setCurrentQuoteId] = useState<string | null>(null);
  const [friendData, setFriendData] = useState<null | FriendData>(null);
  const router = useRouter();

  const handleFriend = (data: any) => {
    setFriendData({
      from: data.from,
      status: data.status,
    });
  };

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
    setIsSearch,
    isSearch,
    setUserData,
    currentQuoteId,
    handleCurrentQuoteId,
    newLikes,
    commentsArr,
    handleNewLikes,
    handleNewComment,
    handleFriend,
    friendData,
    setFriendData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

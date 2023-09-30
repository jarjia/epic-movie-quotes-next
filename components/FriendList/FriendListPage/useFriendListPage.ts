import { useAuthService } from '@/services';
import { useQuery } from 'react-query';
import { AddFriendList } from './types';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';
import { useTranslation } from 'next-i18next';

const useFriendListPage = () => {
  const { getAllUsers } = useAuthService();
  const { t } = useTranslation('newsFeed');
  const { t: social } = useTranslation('social');
  const { data } = useQuery('users-for-friends', getAllUsers);
  const { feedFormStatus, currentQuoteId } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<null | AddFriendList[]>(null);

  useEffect(() => {
    setFriends(data?.data);
  }, [data?.data]);

  return {
    search,
    setSearch,
    friends,
    feedFormStatus,
    currentQuoteId,
    t,
    social,
  };
};

export default useFriendListPage;

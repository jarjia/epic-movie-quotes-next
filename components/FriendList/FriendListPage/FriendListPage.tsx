import {
  FeedFormLayout,
  FeedLayout,
  Friend,
  ViewQuoteModal,
} from '@/components';
import { useAuthService } from '@/services';
import { useQuery } from 'react-query';
import { AddFriendList } from './types';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';
import { useTranslation } from 'next-i18next';

const FriendListPage = () => {
  const { getAllUsers } = useAuthService();
  const { t } = useTranslation('newsFeed');
  const { data } = useQuery('users-for-friends', getAllUsers);
  const { feedFormStatus, currentQuoteId, friendData, setFriendData } =
    useContext(AppContext);
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<null | AddFriendList[]>(null);

  useEffect(() => {
    setFriends(data?.data);
  }, [data?.data]);

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'view-quote' ? (
          <FeedFormLayout title={`${t('view_quote')}`}>
            <ViewQuoteModal quoteId={currentQuoteId} />
          </FeedFormLayout>
        ) : null}
        <div className='px-2 py-6'>
          <h1 className='text-2xl text-white mb-6 capitalize'>people</h1>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full mb-4 bg-transparent text-white caret-white border-transparent border-b-2 border-b-placeholder focus:ring-0 focus:border-b-placeholder  focus:border-transparent'
            placeholder='Search people...'
          />
          {friends &&
            friends
              .filter((item: AddFriendList) => item.name.includes(search))
              .map((item: AddFriendList) => {
                return (
                  <Friend
                    key={item.id}
                    data={item}
                    update={friendData?.from === item.id ? friendData : null}
                    setFriendData={setFriendData}
                  />
                );
              })}
        </div>
      </>
    </FeedLayout>
  );
};

export default FriendListPage;

import {
  FeedFormLayout,
  FeedLayout,
  Friend,
  ViewQuoteModal,
} from '@/components';
import useFriendListPage from './useFriendListPage';
import { AddFriendList } from './types';

const FriendListPage = () => {
  const {
    currentQuoteId,
    t,
    social,
    feedFormStatus,
    setSearch,
    search,
    friends,
  } = useFriendListPage();

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'view-quote' ? (
          <FeedFormLayout title={`${t('view_quote')}`}>
            <ViewQuoteModal quoteId={currentQuoteId} />
          </FeedFormLayout>
        ) : null}
        <div className='px-2 py-6'>
          <h1 className='text-2xl text-white mb-6 capitalize'>
            {social('people')}
          </h1>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full mb-4 bg-transparent text-white caret-white border-transparent border-b-2 border-b-placeholder focus:ring-0 focus:border-b-placeholder  focus:border-transparent'
            placeholder={`${social('search_placeholder')}`}
          />
          {friends &&
            friends
              .filter((item: AddFriendList) => item.name.includes(search))
              .map((item: AddFriendList) => {
                return <Friend key={item.id} data={item} />;
              })}
        </div>
      </>
    </FeedLayout>
  );
};

export default FriendListPage;

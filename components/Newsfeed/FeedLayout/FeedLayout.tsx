import { FeedNavbar } from '../FeedNavbar';
import classes from '@/styles/Landing.module.css';
import { FeedSidebar } from '../FeedSidebar';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/context';
import { FeedFormLayout } from '@/components';
import { AddQuoteModal } from '../Modals';
import { FeedLayoutTypes } from './types';

const FeedLayout: React.FC<FeedLayoutTypes> = (props) => {
  const { feedFormStatus } = useContext(AppContext);

  useEffect(() => {
    if (feedFormStatus !== '') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [feedFormStatus]);

  return (
    <section className={`${classes.newsfeed} w-screen h-full`}>
      <FeedNavbar />
      <FeedSidebar />
      {feedFormStatus !== '' && (
        <div className='fixed w-screen h-screen z-[998]'></div>
      )}
      <section className='pt-24 h-full px-newsfeed-layout sm:px-0 large:px-large-newsfeed-layout'>
        {feedFormStatus === 'add-quote' ? (
          <FeedFormLayout title='write new quote'>
            <AddQuoteModal />
          </FeedFormLayout>
        ) : null}
        <div className={`${feedFormStatus !== '' && 'opacity-[0.2]'}`}>
          {props.children}
        </div>
      </section>
    </section>
  );
};

export default FeedLayout;

import classes from '@/styles/Landing.module.css';
import { FeedNavbar, FeedSidebar } from '@/components';
import { FeedLayoutTypes } from './types';
import useFeedLayout from './useFeedLayout';

const FeedLayout: React.FC<FeedLayoutTypes> = (props) => {
  const { feedFormStatus } = useFeedLayout();

  return (
    <section className={`${classes.newsfeed} w-screen h-full min-h-screen`}>
      <FeedNavbar />
      <FeedSidebar />
      {feedFormStatus !== '' && (
        <div className='fixed w-screen h-screen z-[998]'></div>
      )}
      <section className='pt-24 h-full px-newsfeed-layout sm:px-0 large:px-large-newsfeed-layout'>
        <div>{props.children}</div>
      </section>
    </section>
  );
};

export default FeedLayout;

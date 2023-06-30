import classes from '@/styles/Landing.module.css';
import { FeedNavbar, FeedSidebar } from '@/components';
import { FeedLayoutTypes } from './types';
import useFeedLayout from './useFeedLayout';
import { ToastContainer } from 'react-toastify';

const FeedLayout: React.FC<FeedLayoutTypes> = (props) => {
  const { feedFormStatus, router, isLoading, isError, handleFeedFormStatus } =
    useFeedLayout();

  if (isLoading || isError) {
    return <div className={`${classes.newsfeed} w-screen h-screen`}></div>;
  }

  return (
    <section className={`${classes.newsfeed} w-screen h-full min-h-screen`}>
      <ToastContainer autoClose={3000} className='select-none' />
      <FeedNavbar />
      <FeedSidebar />
      {feedFormStatus !== '' && (
        <div
          onClick={() => handleFeedFormStatus('')}
          className='fixed w-screen h-screen z-[998]'
        ></div>
      )}
      <section
        className={`pt-24 h-full ${
          router.pathname.includes('movie-list')
            ? 'pl-newsfeed-layout large:pl-large-newsfeed-layout sm:pl-8 pr-8 large:pr-16'
            : `normal:px-newsfeed-layout sm:px-0 sm:pl-0 large:px-large-newsfeed-layout ${
                router.pathname === '/profile'
                  ? 'huge:px-large-newsfeed-layout'
                  : 'huge:px-huge-newsfeed-layout'
              } mid:pl-newsfeed-layout mid:pr-8`
        }`}
      >
        <div>{props.children}</div>
      </section>
    </section>
  );
};

export default FeedLayout;

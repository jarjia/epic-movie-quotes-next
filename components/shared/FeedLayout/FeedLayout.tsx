import classes from '@/styles/Landing.module.css';
import { BackArrowIcon, FeedNavbar, FeedSidebar } from '@/components';
import { FeedLayoutTypes } from './types';
import useFeedLayout from './useFeedLayout';
import { ToastContainer } from 'react-toastify';

const FeedLayout: React.FC<FeedLayoutTypes> = (props) => {
  const { feedFormStatus, router, isLoading, isError, isScrollUpNeeded } =
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
        <div className='fixed w-screen h-screen z-[998]'></div>
      )}
      <section
        className={`pt-24 h-full ${
          router.pathname.includes('movie-list')
            ? 'pl-newsfeed-layout large:pl-large-newsfeed-layout sm:pl-8 pr-8 large:pr-16'
            : 'px-newsfeed-layout sm:px-0 large:px-large-newsfeed-layout huge:px-huge-newsfeed-layout'
        }`}
      >
        <div>{props.children}</div>
      </section>
      {isScrollUpNeeded && (
        <div className='fixed sm:hidden top-[85%] left-[90%] z-[999]'>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className='rotate-90 bg-post-bg shadow-2xl rounded-full p-4 px-3.5'
          >
            <BackArrowIcon isSearch={true} />
          </button>
        </div>
      )}
    </section>
  );
};

export default FeedLayout;

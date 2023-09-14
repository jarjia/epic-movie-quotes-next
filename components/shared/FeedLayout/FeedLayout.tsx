import { FeedNavbar, FeedSidebar } from '@/components';
import { FeedLayout } from './types';
import useFeedLayout from './useFeedLayout';
import { ToastContainer } from 'react-toastify';

const FeedLayout: React.FC<FeedLayout> = (props) => {
  const {
    isBurger,
    feedFormStatus,
    router,
    isLoading,
    isError,
    users,
    onlineUsers,
    setShouldLogout,
    handleFeedFormStatus,
    setIsBurger,
  } = useFeedLayout();

  if (isLoading || isError) {
    return <div className='newsfeed w-screen h-screen'></div>;
  }

  return (
    <section className='newsfeed w-screen h-full min-h-screen'>
      <ToastContainer autoClose={3000} className='select-none' />
      <FeedNavbar setShouldLogout={setShouldLogout} setIsBurger={setIsBurger} />
      {feedFormStatus !== '' && (
        <div
          onClick={() => handleFeedFormStatus('')}
          className='fixed w-screen h-screen z-[998]'
        ></div>
      )}
      <section
        className={`grid ${
          router.pathname.includes('movie-list')
            ? 'grid-cols-[25%_75%] pl-3 pr-6'
            : 'grid-cols-[25%_50%_25%] mid-normal:grid-cols-[30%_70%] mid-normal:pr-4'
        } h-full sm:grid-cols-1 pt-24`}
      >
        <FeedSidebar
          setShouldLogout={setShouldLogout}
          setIsBurger={setIsBurger}
          isBurger={isBurger}
        />
        <div className='px-4'>{props.children}</div>
        <div
          className={`${
            router.pathname.includes('movie-list') ? 'hidden' : 'flex'
          } relative sm:fixed sm:left-0 mid-normal:hidden sm:hidden`}
        >
          <div className='fixed sm:bg-form-back w-1/4 sm:w-[30%] sm:pl-0 px-2 pl-6 flex flex-col'>
            {users &&
              users.map((item) => {
                return (
                  <div
                    key={item.id}
                    className='flex justify-between items-center text-white gap-2 my-2'
                  >
                    <div className='flex gap-2 items-center'>
                      <div>
                        <div
                          className='w-[30px] h-[30px] bg-contain bg-center rounded-full'
                          style={{
                            backgroundImage: `url(${item.thumbnail})`,
                          }}
                        ></div>
                      </div>
                      <div>
                        <h4>{item.name}</h4>
                      </div>
                    </div>
                    <div
                      className={`h-2 w-2 ${
                        onlineUsers.find((user) => user.id === item.id) ===
                        undefined
                          ? 'bg-gray-700'
                          : 'bg-green-700'
                      } rounded-full relative right-2`}
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default FeedLayout;

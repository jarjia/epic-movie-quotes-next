import { CloseIcon, UserProfile } from '@/components';
import { FeedFormLayoutTypes } from './types';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { useRouter } from 'next/router';

const FeedFormLayout: React.FC<FeedFormLayoutTypes> = ({ children, title }) => {
  const { handleFeedFormStatus, userData } = useContext(AppContext);
  const router = useRouter();

  return (
    <div className='relative sm:absolute sm:left-0 sm:top-0 w-full z-[999]'>
      <div
        className={`absolute ${
          router.pathname === '/newsfeed' ? 'w-full' : 'w-4/6'
        } sm:w-full rounded-form-radius bg-form-back`}
      >
        <div className='grid grid-cols-[97%_3%] border-b-[1px] border-search-bar-border p-4 py-6'>
          <div>
            <h2 className='text-white text-2xl text-center capitalize'>
              {title}
            </h2>
          </div>
          <div>
            <button
              onClick={() => handleFeedFormStatus('')}
              className='relative cursor-pointer'
            >
              <CloseIcon color={false} isSmall={false} />
            </button>
          </div>
        </div>
        <div className='p-6 my-4 sm:h-screen h-[410px] large:h-full overflow-y-scroll scrollbar'>
          <div className='flex items-center gap-4 text-white text-xl'>
            <UserProfile />
            <h4>{userData?.name}</h4>
          </div>
          <div className='mb-0 sm:mb-24'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedFormLayout;

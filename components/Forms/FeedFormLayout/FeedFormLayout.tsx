import { CloseIcon } from '@/components';
import { FeedFormLayoutTypes } from './types';
import { useContext } from 'react';
import { AppContext } from '@/context';

const FeedFormLayout: React.FC<FeedFormLayoutTypes> = ({ children, title }) => {
  const { handleFeedFormStatus } = useContext(AppContext);

  return (
    <div className='relative sm:absolute sm:top-0 w-full z-[999]'>
      <div className='absolute w-full rounded-form-radius bg-form-back'>
        <div className='grid grid-cols-[97%_3%] border-b-[1px] border-search-bar-border p-4 py-6'>
          <div>
            <h2 className='text-white text-2xl text-center capitalize'>
              {title}
            </h2>
          </div>
          <div>
            <button
              onClick={() => handleFeedFormStatus('')}
              className='relative rotate-45 cursor-pointer'
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className='p-6 py-4 h-[440px] sm:h-[460px] overflow-y-scroll scrollbar'>
          <div className='flex items-center gap-4 text-white text-xl'>
            <div
              className='w-profile h-profile rounded-full bg-center bg-cover'
              style={{ backgroundImage: 'url(/assets/images/user.png)' }}
            ></div>
            <h4>jarji abuashvili</h4>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedFormLayout;

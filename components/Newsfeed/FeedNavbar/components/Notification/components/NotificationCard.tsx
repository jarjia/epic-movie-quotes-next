import { FilledHeartIcon, QuoteIcon } from '@/components';

const NotificationCard = () => {
  return (
    <>
      <div className='flex p-4 my-3 items-center border-[1px] gap-2 border-placeholder'>
        <div className='flex flex-col items-center'>
          <div
            className='w-profile h-profile rounded-full bg-center bg-cover border-2 border-valid-form'
            style={{ backgroundImage: 'url(/assets/images/user.png)' }}
          ></div>
          <p className='text-valid-form text-xl sm:text-lg hidden sm:block'>
            New
          </p>
        </div>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <h4 className='text-xl'>jarji abuashvili</h4>
            <p className='text-xl sm:hidden text-date-of-notification sm:text-lg'>
              5 min ago
            </p>
          </div>
          <div className='my-2 flex sm:block items-center justify-between'>
            <h4 className='flex sm:text-lg items-center text-xl gap-2 text-date-of-notification'>
              <FilledHeartIcon />
              Reacted to your quote
            </h4>
            <p className='text-valid-form text-xl sm:text-lg sm:hidden'>New</p>
            <p className='text-xl sm:block hidden text-date-of-notification sm:text-lg'>
              5 min ago
            </p>
          </div>
        </div>
      </div>
      <div className='flex p-4 my-3 items-center border-[1px] gap-2 border-placeholder'>
        <div className='flex flex-col items-center'>
          <div
            className='w-profile h-profile rounded-full bg-center bg-cover border-2 border-valid-form'
            style={{ backgroundImage: 'url(/assets/images/user.png)' }}
          ></div>
          <p className='text-valid-form text-xl sm:text-lg hidden sm:block'>
            New
          </p>
        </div>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <h4 className='text-xl'>jarji abuashvili</h4>
            <p className='text-xl sm:hidden text-date-of-notification sm:text-lg'>
              5 min ago
            </p>
          </div>
          <div className='my-2 flex sm:block items-center justify-between'>
            <h4 className='flex sm:text-lg items-center text-xl gap-2 text-date-of-notification'>
              <QuoteIcon />
              Commented to your quote
            </h4>
            <p className='text-valid-form text-xl sm:text-lg sm:hidden'>New</p>
            <p className='text-xl sm:block hidden text-date-of-notification sm:text-lg'>
              5 min ago
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;

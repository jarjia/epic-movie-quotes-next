import { ErrorLayout, ForbiddenIcon } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const Forbidden = () => {
  useEffect(() => {
    localStorage.removeItem('remember_me');
  }, []);

  return (
    <ErrorLayout>
      <div className='flex p-2 flex-col justify-center items-center'>
        <div>
          <div className='relative top-[65px]'>
            <Image
              src='/assets/images/gandalf-back.png'
              width={220}
              height={220}
              className='absolute z-[0]'
              alt='background'
            />
          </div>
          <ForbiddenIcon />
        </div>
        <h2 className='text-white text-center text-error-page-title'>
          You shall not pass!
        </h2>
        <p className='text-white text-center text-2xl my-2'>
          Sorry, but you don’t have permission to access this page
        </p>
        <Link
          href='/'
          className='bg-default-btn my-4 py-2 rounded-[4.8px] px-4 text-white text-xl'
        >
          Return home
        </Link>
      </div>
    </ErrorLayout>
  );
};

export default Forbidden;

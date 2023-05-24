import { ErrorLayout, NotFoundIcon } from '@/components';
import Link from 'next/link';

const NotFound = () => {
  return (
    <ErrorLayout>
      <div className='flex flex-col justify-center items-center'>
        <NotFoundIcon />
        <h2 className='text-white text-error-page-title'>Whoops!</h2>
        <p className='text-white text-2xl my-2'>
          We can&apos;t see the page you are looking for
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

export default NotFound;

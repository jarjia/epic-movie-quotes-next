import { LinkExpiredIcon } from '@/components';
import classes from '@/styles/Landing.module.css';
import { HandleFormStatusTypes } from '@/types';
import { useRouter } from 'next/router';

const LinkExpired: React.FC<HandleFormStatusTypes> = ({ handleFormStatus }) => {
  const router = useRouter();

  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <LinkExpiredIcon />
      <h2 className='my-6 text-error-page-title text-white text-3xl'>
        Link expired!
      </h2>
      <p className='my-2 text-center text-white'>
        Login link has expired, because you haven’t used it
      </p>
      <button
        onClick={() => {
          if (router.query.recover_token !== undefined) {
            handleFormStatus('login');
          } else if (router.query.token !== undefined) {
            handleFormStatus('register');
          }
        }}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        Request another link
      </button>
    </div>
  );
};

export default LinkExpired;

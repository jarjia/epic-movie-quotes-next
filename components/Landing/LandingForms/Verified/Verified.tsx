import { SuccessIcon } from '@/components';
import classes from '@/styles/Landing.module.css';
import { HandleFormStatusTypes } from '@/types';

const Verified: React.FC<HandleFormStatusTypes> = (props) => {
  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <SuccessIcon />
      <h2 className='my-6 text-error-page-title text-white text-3xl'>
        Thank you!
      </h2>
      <p className='my-2 text-center text-white'>
        Your account has been activated.
      </p>
      <button
        onClick={() => props.handleFormStatus('login')}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        Go to log in
      </button>
    </div>
  );
};

export default Verified;

import { EmailSentIcon } from '@/components';
import { HandleFormStatusTypes } from '@/types';
import classes from '@/styles/Landing.module.css';

const RecoverEmailSent: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <EmailSentIcon />
      <h2 className='my-6 text-error-page-title text-white text-3xl'>
        Check your email
      </h2>
      <p className='my-2 text-center text-white'>
        We have sent a password recover instructions to your email
      </p>
      <button
        onClick={() => handleFormStatus('login')}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        Log in
      </button>
      <button
        onClick={() => handleFormStatus('null')}
        className='mt-8 hover:underline text-form-small-title'
      >
        Skip, I’ll confirm later
      </button>
    </div>
  );
};

export default RecoverEmailSent;

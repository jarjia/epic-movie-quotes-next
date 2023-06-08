import { PasswordRecoveredIcon } from '@/components';
import { HandleFormStatusTypes } from '@/types';
import classes from '@/styles/Landing.module.css';

const PasswordRecovered: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <PasswordRecoveredIcon />
      <h2 className='my-6 text-error-page-title text-white text-3xl'>
        Success!
      </h2>
      <p className='my-2 text-center text-white'>
        Your Password changed successfully
      </p>
      <button
        onClick={() => handleFormStatus('login')}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        Log in
      </button>
    </div>
  );
};

export default PasswordRecovered;

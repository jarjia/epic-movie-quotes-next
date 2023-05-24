import { EmailSentIcon } from '@/components';
import classes from '@/styles/Landing.module.css';

const EmailSent = () => {
  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <EmailSentIcon />
      <h2 className='my-2 text-error-page-title text-white text-3xl'>
        Thank you!
      </h2>
      <p className='my-2 text-center text-white'>
        Please check your email and follow the instructions to activate your
        account.
      </p>
      <button
        onClick={() => {
          window.location.href = `mailto:${JSON.parse(
            sessionStorage.getItem('email-for-redirection') || '{}'
          )}`;
          sessionStorage.removeItem('email-for-redirection');
        }}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        Go to my email
      </button>
    </div>
  );
};

export default EmailSent;

import { GoogleIcon, Input } from '@/components';
import { LoginFormTypes } from './types';

const LoginForm: React.FC<LoginFormTypes> = (props) => {
  return (
    <div className='w-full h-full'>
      <div className='text-center mb-8 sm:py-8 sm:pt-16 sm:mb-0'>
        <h2 className='text-form-title sm:text-2xl text-white font-medium'>
          Log in to your account
        </h2>
        <h4 className='text-form-small-title sm:py-2'>
          Welcome back! Please enter your details.
        </h4>
      </div>
      <form>
        <Input
          name='username_or_email'
          type='text'
          placeholder='Enter your email'
          label='Email'
        />
        <Input
          name='password'
          type='password'
          placeholder='At least 8 & max.15 lower case characters'
          label='Password'
        />
        <div className='flex justify-between py-2'>
          <div className='flex items-center gap-2 mb-2'>
            <input
              className='text-checkbox rounded focus:ring-offset-0 focus:ring-0 or focus:ring-transparent'
              type='checkbox'
              name='remember_token'
              id='remember_token'
            />
            <label className='block text-white' htmlFor='remember_token'>
              Remember me
            </label>
          </div>
          <div>
            <a href='#' className='text-link underline'>
              Forgot password
            </a>
          </div>
        </div>
        <div className='pt-1'>
          <button
            type='submit'
            className='bg-default-btn hover:bg-hover mb-[12px] active:bg-active w-full py-[6px] rounded text-white'
          >
            Sign in
          </button>
          <button
            type='button'
            className='bg-transparent flex justify-center items-center border-[1px] border-white w-full py-[6px] rounded text-white'
          >
            <GoogleIcon />
            <span className='pl-1'>Sign up with Google</span>
          </button>
        </div>
      </form>
      <div className='flex justify-center py-3'>
        <p className='absolute text-form-small-title'>
          Don&apos;t have an account?
          <button
            className='underline text-link'
            onClick={() => props.handleToggleRegister(true)}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

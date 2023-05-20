import { Input, GoogleIcon } from '@/components';
import { RegisterFormTypes } from './types';

const RegisterForm: React.FC<RegisterFormTypes> = (props) => {
  return (
    <div className='w-full h-full'>
      <div className='text-center sm:py-8'>
        <h2 className='text-form-title sm:text-2xl text-white font-medium'>
          Create an account
        </h2>
        <h4 className='text-form-small-title sm:py-2'>Start your journey!</h4>
      </div>
      <form>
        <Input
          name='name'
          type='text'
          placeholder='At least 3 & max.15 lower case characters'
          label='Name'
        />
        <Input
          name='email'
          type='email'
          placeholder='Enter your email'
          label='Email'
        />
        <Input
          name='password'
          type='password'
          placeholder='At least 8 & max.15 lower case characters'
          label='Password'
        />
        <Input
          name='confirm_password'
          type='password'
          placeholder='Confirm password'
          label='Confirm password'
        />
        <div className='pt-1'>
          <button
            type='submit'
            className='bg-default-btn hover:bg-hover mb-[12px] active:bg-active w-full py-[6px] rounded text-white'
          >
            Get started
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
          Already have an account?
          <button
            className='underline text-link'
            onClick={() => props.handleToggleLogin(true)}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

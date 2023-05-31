import { GoogleIcon, Input, Checkbox, PasswordInput } from '@/components';
import useLoginForm from './useLoginForm';
import { HandleFormStatusTypes } from '@/types';

const LoginForm: React.FC<HandleFormStatusTypes> = ({ handleFormStatus }) => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    handleUserRedirectGoogle,
    form,
    handleResetApiError,
    FormProvider,
    apiError,
  } = useLoginForm();

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
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name='user'
            type='text'
            placeholder='Enter your username or email'
            label='Username or Email'
            errors={errors}
          />
          <PasswordInput
            name='password'
            placeholder='At least 8 & max.15 lower case characters'
            label='Password'
            errors={errors}
          />
          <div className='flex justify-between py-2'>
            <div className='flex items-center gap-2 mb-2'>
              <Checkbox name='remember_me' label='Remember me' />
            </div>
            <button
              className='text-link underline'
              onClick={() => handleFormStatus('recover-email')}
            >
              Forgot password
            </button>
          </div>
          <div className='pb-7 pt-1 flex justify-center'>
            {apiError !== '' && (
              <p className='absolute text-center text-default-btn font-normal text-md'>
                {apiError}
              </p>
            )}
          </div>
          <div className='pt-1'>
            <button
              type='submit'
              onClick={handleResetApiError}
              className='bg-default-btn hover:bg-hover mb-[12px] active:bg-active w-full py-[6px] rounded text-white'
            >
              Sign in
            </button>
            <button
              type='button'
              onClick={handleUserRedirectGoogle}
              className='bg-transparent flex justify-center items-center border-[1px] border-white w-full py-[6px] rounded text-white'
            >
              <GoogleIcon />
              <span className='pl-1'>Sign in with Google</span>
            </button>
          </div>
        </form>
      </FormProvider>
      <div className='flex justify-center py-3'>
        <p className='absolute text-form-small-title'>
          Don&apos;t have an account?
          <button
            className='underline text-link'
            onClick={() => handleFormStatus('register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

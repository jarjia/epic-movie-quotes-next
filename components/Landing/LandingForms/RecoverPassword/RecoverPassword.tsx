import { HandleFormStatusTypes } from '@/types';
import useRecoverPassword from './useRecoverPassword';
import { BackArrowIcon, PasswordInput } from '@/components';

const RecoverPassword: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  const { handleSubmit, errors, form, onSubmit, FormProvider } =
    useRecoverPassword(handleFormStatus);

  return (
    <div className='w-full h-full'>
      <div className='text-center sm:py-8'>
        <h2 className='my-2 text-form-title sm:text-2xl text-white font-medium'>
          Create new password
        </h2>
        <h4 className='my-2 text-form-small-title sm:py-2'>
          Your new password must be different from previous used passwords
        </h4>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PasswordInput
            name='password'
            placeholder='At least 8 & max.15 lower case characters'
            label='Password'
            errors={errors}
          />
          <PasswordInput
            name='confirm_password'
            placeholder='Confirm password'
            label='Confirm password'
            errors={errors}
          />
          <div className='pt-2'>
            <button
              type='submit'
              className='bg-default-btn hover:bg-hover mb-[12px] active:bg-active w-full py-[6px] rounded text-white'
            >
              Reset password
            </button>
          </div>
        </form>
      </FormProvider>
      <div className='flex justify-center py-3'>
        <p className='absolute text-form-small-title'>
          <button
            className='flex items-center gap-4 hover:underline'
            onClick={() => handleFormStatus('login')}
          >
            <BackArrowIcon />
            Back to log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecoverPassword;

import React from 'react';
import useRecoverEmail from './useRecoverEmail';
import { HandleFormStatusTypes } from '@/types';
import { BackArrowIcon, Input } from '@/components';

const RecoverEmail: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  const { handleSubmit, errors, form, apiError, onSubmit, FormProvider } =
    useRecoverEmail(handleFormStatus);

  return (
    <div className='w-full h-full'>
      <div className='text-center sm:py-8'>
        <h2 className='my-2 text-form-title sm:text-2xl text-white font-medium'>
          Forgot password?
        </h2>
        <h4 className='my-2 text-form-small-title sm:py-2'>
          Enter the email and we’ll send an email with instructions to reset
          your password
        </h4>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name='email'
            type='email'
            placeholder='Enter your email'
            label='Email'
            errors={errors}
          />
          <div className='pb-6 flex justify-center'>
            {apiError !== '' && (
              <p className='absolute text-center text-default-btn font-normal text-md'>
                {apiError}
              </p>
            )}
          </div>
          <div className='pt-2'>
            <button
              type='submit'
              className='bg-default-btn hover:bg-hover mb-[12px] active:bg-active w-full py-[6px] rounded text-white'
            >
              Send instructions
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

export default RecoverEmail;

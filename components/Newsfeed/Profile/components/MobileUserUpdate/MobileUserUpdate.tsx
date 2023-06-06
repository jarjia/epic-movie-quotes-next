import { useUserUpdate } from '@/components';
import { MobileInputUpdateTypes } from './types';
import { IsSure } from './components';
import { useWatch } from 'react-hook-form';

const MobileUserUpdate = ({
  editProfile,
  handleEditProfileClear,
  handleIsSure,
  handleIsSuccess,
  isSure,
}: MobileInputUpdateTypes) => {
  const { form, FormProvider, control, handleSubmit, errors, onSubmit } =
    useUserUpdate(handleEditProfileClear, handleIsSuccess);
  const error: any = errors;

  const isObjEmpty = (obj: {}) => {
    return Object.keys(obj).length === 0;
  };

  const input = useWatch({ control, name: editProfile.name });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {isSure ? (
          <IsSure handleIsSure={handleIsSure} />
        ) : (
          <>
            <div className='flex pt-12 pb-16 items-center justify-center w-full mt-4 bg-post-bg sm:bg-add-quote-bg rounded-xl'>
              <div className='w-5/6'>
                {editProfile.name !== 'password' ? (
                  <div className='flex flex-col'>
                    <label className='text-white mb-1' htmlFor='name'>
                      {editProfile.placeholder}
                    </label>
                    <input
                      type={editProfile.type}
                      {...form.register(editProfile.name)}
                      className='px-2 py-2 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                      placeholder={editProfile.placeholder}
                      autoComplete='off'
                    />
                    <div className='mt-[2px]'>
                      <p className='absolute text-default-btn font-normal text-md'>
                        {error[editProfile.name]?.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='p-4 my-2 w-full border-[1px] border-search-bar-border'>
                      <h3 className='text-white'>Password should contain:</h3>
                      <ul className='pl-5 pt-2'>
                        <li className='list-disc text-input'>
                          8 or more characters
                        </li>
                        <li className='list-disc text-white'>
                          15 lowercase character
                        </li>
                      </ul>
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-white mb-1'
                        htmlFor={editProfile.name}
                      >
                        Enter new password
                      </label>
                      <input
                        type='password'
                        {...form.register(editProfile.name)}
                        className='px-2 py-1.5 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                        placeholder='Enter new password'
                        autoComplete='off'
                      />
                      <div className='mt-[2px]'>
                        <p className='absolute text-default-btn font-normal text-sm'>
                          {error['password']?.message}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col mt-4'>
                      <label className='text-white mb-1' htmlFor='c_password'>
                        Repeat new password
                      </label>
                      <input
                        type='password'
                        {...form.register('c_password')}
                        className='px-2 py-1.5 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                        placeholder='Repeat new password'
                        autoComplete='off'
                      />
                      <div className='mt-[2px]'>
                        <p className='absolute text-default-btn font-normal text-sm'>
                          {error['c_password']?.message}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='flex p-2 items-center justify-between px-8 mt-2'>
              <button
                onClick={handleEditProfileClear}
                type='button'
                className='text-input text-primary-font'
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  isObjEmpty(error) && input !== undefined && handleIsSure(true)
                }
                className='text-white rounded px-5 py-1.5 text-primary-font bg-default-btn hover:bg-hover active:bg-active'
              >
                Edit
              </button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default MobileUserUpdate;

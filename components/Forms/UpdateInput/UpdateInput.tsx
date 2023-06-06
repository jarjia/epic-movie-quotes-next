import { useContext } from 'react';
import { UpdateInputTypes } from './types';
import useUpdateInput from './useUpdateInput';
import { AppContext } from '@/context';
import { UserDataTypes } from '@/types';

const UpdateInput: React.FC<UpdateInputTypes> = (props) => {
  const { register, isEdit, handleIsEdit } = useUpdateInput(props);
  const { userData } = useContext(AppContext);
  let index = props.name;

  return (
    <div className='flex flex-col items-center my-2'>
      <div className='grid grid-cols-[90%_10%] w-1/2 sm:w-full sm:px-8 mb-5'>
        <div className='flex flex-col'>
          <label className='text-white mb-1' htmlFor={props.name}>
            {props.label}
          </label>
          <input
            type={props.type}
            className='px-2 py-1.5 sm:text-white sm:py-3 sm:px-0 text-primary-font placeholder-placeholder sm:bg-transparent sm:border-0 sm:rounded-none sm:border-b-[1px] sm:border-input focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
            value={userData[index as keyof UserDataTypes]}
            placeholder={props.label}
            disabled
          />
        </div>
        {props.name !== 'email' && (
          <div className='flex items-end'>
            <button
              onClick={handleIsEdit}
              type='button'
              className='relative sm:hidden block bottom-2 left-4 text-white'
            >
              Edit
            </button>
            <button
              onClick={() =>
                props.handleEditProfile({
                  name: props.name,
                  label: props.placeholder,
                  placeholder: props.placeholder,
                  isEdit: true,
                  type: props.type,
                })
              }
              type='button'
              className='relative sm:block hidden bottom-2 left-4 text-white'
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {isEdit && (
        <div className='w-1/2 mt-2 mb-4'>
          {props.name === 'password' ? (
            <>
              <div className='p-4 my-2 w-full border-[1px] border-search-bar-border'>
                <h3 className='text-white'>Password should contain:</h3>
                <ul className='pl-5 pt-2'>
                  <li className='list-disc text-input'>8 or more characters</li>
                  <li className='list-disc text-white'>
                    15 lowercase character
                  </li>
                </ul>
              </div>
              <div className='flex flex-col'>
                <label className='text-white mb-1' htmlFor={props.name}>
                  {props.label}
                </label>
                <input
                  type={props.type}
                  {...register(props.name)}
                  className='px-2 py-1.5 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                  placeholder={props.placeholder}
                  autoComplete='off'
                />
                <div className='mt-[2px]'>
                  <p className='absolute text-default-btn font-normal text-sm'>
                    {props.errors['password']?.message}
                  </p>
                </div>
              </div>
              <div className='flex flex-col mt-4'>
                <label className='text-white mb-1' htmlFor={props.repeatName}>
                  {props.repeatLabel}
                </label>
                <input
                  type={props.type}
                  {...register(props.repeatName)}
                  className='px-2 py-1.5 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                  placeholder={props.repeatLabel}
                  autoComplete='off'
                />
                <div className='mt-[2px]'>
                  <p className='absolute text-default-btn font-normal text-sm'>
                    {props.errors['c_password']?.message}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className='flex flex-col'>
              <label className='text-white mb-1' htmlFor={props.name}>
                {props.label}
              </label>
              <input
                type={props.type}
                {...register(props.name)}
                className='px-2 py-1.5 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                placeholder={props.placeholder}
                autoComplete='off'
              />
              <div className='mt-[2px]'>
                <p className='absolute text-default-btn font-normal text-sm'>
                  {props.errors[props.name]?.message}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateInput;

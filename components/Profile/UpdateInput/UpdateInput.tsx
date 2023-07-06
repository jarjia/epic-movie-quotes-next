import { PasswordInput } from '@/components';
import { UpdateInput } from './types';
import useUpdateInput from './useUpdateInput';
import { UserData } from '@/types';

const UpdateInput: React.FC<UpdateInput> = (props) => {
  const {
    register,
    isEdit,
    setIsEdit,
    inputRef,
    t,
    inputWidth,
    userData,
    index,
    password,
    router,
  } = useUpdateInput(props);

  return (
    <div className='flex flex-col items-center my-2'>
      <div
        className={`grid grid-cols-[90%_10%] w-1/2 sm:w-full sm:px-6 sm:pr-2 mb-5`}
      >
        <div className='flex flex-col'>
          <label className='text-white mb-1'>{props.label}</label>
          <div className='flex justify-between'>
            <input
              ref={inputRef}
              type={props.type}
              className={`${
                props.name === 'password' && 'leading-[30px] pb-0'
              } sm:placeholder-white w-full px-2 py-1.5 sm:text-white sm:py-3 sm:px-0 text-primary-font placeholder-black sm:bg-transparent sm:border-0 sm:rounded-none sm:border-b-[1px] sm:border-input focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded`}
              value={userData[index as keyof UserData]}
              placeholder={
                props.name === 'password' ? props.placeholder : props.label
              }
              disabled
            />
            <div className='flex justify-around relative top-2'>
              {!props.isGoogle ? (
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
                  className={`right-0 ${
                    router.locale === 'ka' ? 'sm:text-sm' : 'sm:text-base'
                  } capitalize sm:text-input absolute sm:block hidden text-white`}
                >
                  {t('profile_edit')}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {!props.isGoogle ? (
          <div className='flex items-end'>
            <button
              onClick={() => setIsEdit((prev) => !prev)}
              type='button'
              className='capitalize relative sm:hidden block bottom-2 left-4 text-white'
            >
              <span className={isEdit ? 'text-default-btn' : 'text-white'}>
                {isEdit ? t('profile_cancel') : t('profile_edit')}
              </span>
            </button>
          </div>
        ) : null}
      </div>

      {isEdit && (
        <div className='w-1/2 mt-2 mb-4 sm:hidden block'>
          {props.name === 'password' ? (
            <>
              <div className='p-4 my-2 w-full border-[1px] border-search-bar-border'>
                <h3 className='text-white'>
                  {t('profile_password_rules_title')}
                </h3>
                <ul className='list-disc pl-5 pt-2'>
                  <li
                    className={`${
                      password?.length >= 8 ? 'text-disc-valid' : 'text-input'
                    }`}
                  >
                    <span
                      className={`${
                        password?.length >= 8 ? 'text-white' : 'text-input'
                      }`}
                    >
                      {t('profile_password_rule_one')}
                    </span>
                  </li>
                  <li
                    className={`${
                      password?.length <= 15 && password?.length > 0
                        ? 'text-disc-valid'
                        : 'text-input'
                    }`}
                  >
                    <span
                      className={`${
                        password?.length <= 15 && password?.length > 0
                          ? 'text-white'
                          : 'text-input'
                      }`}
                    >
                      {t('profile_password_rule_two')}
                    </span>
                  </li>
                </ul>
              </div>
              <PasswordInput
                name={props.name}
                label={props.newLabel}
                errors={props.errors}
                placeholder={props.placeholder}
              />
              <PasswordInput
                name={props.repeatName}
                label={props.repeatLabel as string}
                errors={props.errors}
                placeholder={props.placeholder}
              />
            </>
          ) : (
            <div className='flex flex-col'>
              <label className='text-white mb-1' htmlFor={props.name}>
                {props.newLabel}
              </label>
              <input
                type={props.type}
                {...register(props.name)}
                className='autofill-for-landing px-2 py-1.5 sm:text-white sm:py-3 sm:px-0 text-primary-font placeholder-placeholder sm:bg-transparent sm:border-0 sm:rounded-none sm:border-b-[1px] sm:border-input focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                style={{
                  width: `${inputWidth as number}px`,
                }}
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

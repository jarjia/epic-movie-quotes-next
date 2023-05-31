import { PasswordInputTypes } from './types';
import { HidePasswordIcon } from '@/components';
import usePasswordInput from './usePasswordInput';

const PasswordInput: React.FC<PasswordInputTypes> = (props) => {
  const { register, input, showPassword, handleTogglePasswordShow } =
    usePasswordInput(props.name);

  return (
    <div className='flex flex-col mb-5'>
      <label className='text-white mb-1' htmlFor={props.name}>
        {props.label} <span className='text-form-required'>*</span>
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(props.name)}
        name={props.name}
        className={`px-2 py-[6px] placeholder-placeholder ${
          props.errors[props.name]
            ? 'border-[1px] border-default-btn'
            : input?.length > 0
            ? 'border-[1px] border-valid-form'
            : null
        } focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded`}
        placeholder={props.placeholder}
        autoComplete='off'
      />
      <div className='flex justify-end relative bottom-7 right-2 w-full'>
        <button
          type='button'
          onClick={handleTogglePasswordShow}
          className='absolute'
        >
          <HidePasswordIcon />
        </button>
      </div>
      <div className='mt-[2px]'>
        <p className='absolute text-default-btn font-normal text-sm'>
          {props.errors[props.name]?.message}
        </p>
      </div>
    </div>
  );
};

export default PasswordInput;

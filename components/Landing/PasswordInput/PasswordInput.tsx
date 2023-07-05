import { PasswordInputTypes } from './types';
import {
  EyeIcon,
  HidePasswordIcon,
  InvalidIcon,
  ValidIcon,
} from '@/components';
import usePasswordInput from './usePasswordInput';
import classes from '@/styles/Landing.module.css';

const PasswordInput: React.FC<PasswordInputTypes> = (props) => {
  const { register, input, showPassword, setShowPassword, router } =
    usePasswordInput(props.name);

  return (
    <div className='flex flex-col mb-10'>
      <label className='text-white mb-1' htmlFor={props.name}>
        {props.label} <span className='text-form-required'>*</span>
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(props.name)}
        name={props.name}
        className={`${classes['autofill-for-landing']} px-2 py-[6px] ${
          router.pathname === '/profile'
            ? 'placeholder-black leading-[30px] pb-0'
            : 'placeholder-placeholder'
        } ${
          props.errors[props.name]
            ? 'border-[1px] border-default-btn pr-14'
            : input?.length > 0
            ? 'border-[1px] border-valid-form pr-14'
            : 'pr-7'
        } focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded`}
        placeholder={props.placeholder}
        autoComplete='off'
      />
      <div
        className={`flex justify-end relative bottom-7 ${
          props.errors[props.name] ||
          (input?.length > 0 && !props.errors[props.name])
            ? 'right-8'
            : 'right-2'
        } w-full`}
      >
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute'
        >
          {showPassword ? <EyeIcon isPassword={true} /> : <HidePasswordIcon />}
        </button>
      </div>
      <div className='flex justify-end relative bottom-7 right-2 w-full'>
        {props.errors[props.name] ? (
          <InvalidIcon />
        ) : input?.length > 0 && !props.errors[props.name] ? (
          <ValidIcon />
        ) : null}
      </div>
      <div className='mt-[2px]'>
        <p className='w-full relative text-default-btn font-normal tiny:text-tiny-font text-sm'>
          <span className='absolute'>{props.errors[props.name]?.message}</span>
        </p>
      </div>
    </div>
  );
};

export default PasswordInput;

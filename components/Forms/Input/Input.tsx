import { InputTypes } from './types';

const Input: React.FC<InputTypes> = (props) => {
  return (
    <div className='flex flex-col mb-5'>
      <label className='text-white mb-1' htmlFor={props.name}>
        {props.label} <span className='text-form-required'>*</span>
      </label>
      <input
        type={props.type}
        name={props.name}
        className='px-2 py-[6px] placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;

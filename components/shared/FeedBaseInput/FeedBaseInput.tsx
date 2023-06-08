import { useFormContext } from 'react-hook-form';
import { FeedBaseInputTypes } from './types';

const FeedBaseInput: React.FC<FeedBaseInputTypes> = (props) => {
  const { register } = useFormContext();
  let error =
    props.lang === 'Eng'
      ? props.errors[props.errorName]?.en
      : props.errors[props.errorName]?.ka;

  return (
    <div className='my-2'>
      <div className='relative float-right right-9 top-[8px] text-white'>
        <p className='absolute text-placeholder'>{props.lang}</p>
      </div>
      <div className='flex'>
        <input
          type={props.type}
          placeholder={props.label}
          {...register(props.name)}
          className={`${
            error !== undefined
              ? 'border-default-btn focus:border-default-btn'
              : 'border-placeholder focus:border-placeholder'
          } w-full placeholder-white caret-white pl-2 text-white bg-transparent pr-10 rounded border-[1px] focus:ring-0 focus:border-placeholder block flex-1 min-w-0`}
        />
      </div>
      <div>
        <p className='text-default-btn text-sm'>
          {props.lang === 'Eng'
            ? props.errors[props.errorName]?.en?.message
            : props.errors[props.errorName]?.ka?.message}
        </p>
      </div>
    </div>
  );
};

export default FeedBaseInput;

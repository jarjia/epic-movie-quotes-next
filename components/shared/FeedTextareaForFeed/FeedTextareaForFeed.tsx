import { useFormContext } from 'react-hook-form';
import { FeedBaseTextareaTypes } from './types';

const FeedTextareaForFeed: React.FC<FeedBaseTextareaTypes> = (props) => {
  const { register } = useFormContext();
  let error =
    props.lang === 'Eng'
      ? props.errors[props.errorName]?.en
      : props.errors[props.errorName]?.ka;

  return (
    <div className='my-2'>
      <div className='relative float-right right-9 top-1 text-white'>
        <p className='absolute text-placeholder'>{props.lang}</p>
      </div>
      <textarea
        placeholder={props.label}
        {...register(props.name)}
        defaultValue={props.defaultVal !== undefined ? props.defaultVal : ''}
        className={`${
          error !== undefined
            ? 'border-default-btn focus:border-default-btn'
            : 'border-placeholder focus:border-placeholder'
        } w-full caret-white placeholder-white border-[1px] text-white pr-10 overflow-hidden focus:ring-0 focus:border-placeholder h-16 min-h-[50px] placeholder-placeholder bg-transparent h-16`}
      ></textarea>
      <div className='mt-[2px]'>
        <p className='text-default-btn text-sm'>
          {props.lang === 'Eng'
            ? props.errors[props.errorName]?.en?.message
            : props.errors[props.errorName]?.ka?.message}
        </p>
      </div>
    </div>
  );
};

export default FeedTextareaForFeed;

import { useFormContext } from 'react-hook-form';
import { FeedBaseInputTypes } from './types';

const FeedBaseInput: React.FC<FeedBaseInputTypes> = (props) => {
  const { register } = useFormContext();
  let error =
    props.lang === 'Eng'
      ? props.errors[props.errorName]?.en
      : props.errors[props.errorName]?.ka;
  const isEdit = props.defaultVal === undefined ? false : true;

  return (
    <div className='my-2'>
      <div className='relative float-right right-9 top-[8px] text-white'>
        <p className='absolute text-placeholder'>{props.lang}</p>
      </div>
      <div className='flex'>
        {isEdit && (
          <span
            className={`${
              error !== undefined ? 'border-default-btn' : 'border-placeholder'
            } text-placeholder border-[1px] border-r-0 inline-flex focus:ring-0 focus:ring-offset-0 items-center px-2 text-sm bg-transparent rounded-l-md`}
          >
            {props.label}:
          </span>
        )}
        <input
          type={props.type}
          placeholder={isEdit ? '' : props.label}
          {...register(props.name)}
          defaultValue={isEdit ? props.defaultVal : ''}
          className={`${
            error !== undefined
              ? 'border-default-btn focus:border-default-btn'
              : 'border-placeholder focus:border-placeholder'
          } ${
            isEdit
              ? 'border-l-0 pl-0 rounded-r'
              : 'placeholder-white pl-2 rounded'
          } w-full caret-white text-white border-[1px] bg-transparent pr-10 focus:ring-0 block flex-1 min-w-0`}
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

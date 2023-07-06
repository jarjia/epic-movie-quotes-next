import { FeedBaseTextarea } from './types';
import useFeedTextarea from './useFeedTextarea';

const FeedTextareaForFeed: React.FC<FeedBaseTextarea> = (props) => {
  const { error, isEdit, register } = useFeedTextarea(props);

  return (
    <div className='my-6'>
      <div className='relative float-right right-9 top-1 text-white'>
        <p className='absolute text-placeholder'>{props.lang}</p>
      </div>
      <div
        className={`flex flex-col ${
          error !== undefined
            ? 'border-default-btn focus:border-default-btn'
            : 'border-placeholder focus:border-placeholder'
        } focus:ring-0 border-[1px] rounded`}
      >
        {isEdit && (
          <span
            className={`text-placeholder relative top-1 inline-flex focus:ring-0 focus:ring-offset-0 items-center px-2 text-sm bg-transparent rounded-l-md`}
          >
            {props.label}:
          </span>
        )}{' '}
        <textarea
          placeholder={props.defaultVal !== undefined ? '' : props.label}
          {...register(props.name)}
          defaultValue={props.defaultVal !== undefined ? props.defaultVal : ''}
          className='w-full caret-white border-0 focus:ring-0 placeholder-white text-white pr-10 overflow-scroll scrollbar h-16 min-h-[50px] placeholder-placeholder bg-transparent'
        ></textarea>
      </div>
      <div className='relative'>
        <p className='absolute text-default-btn text-sm tiny:text-tiny-font'>
          {props.lang === 'Eng'
            ? props.errors[props.errorName]?.en?.message
            : props.errors[props.errorName]?.ka?.message}
        </p>
      </div>
    </div>
  );
};

export default FeedTextareaForFeed;

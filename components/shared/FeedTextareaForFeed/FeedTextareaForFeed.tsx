import { FeedBaseTextarea } from './types';
import useFeedTextarea from './useFeedTextarea';

const FeedTextareaForFeed: React.FC<FeedBaseTextarea> = (props) => {
  const { error, isEdit, register } = useFeedTextarea(props);

  return (
    <div className='my-6'>
      <div className='relative float-right right-12 top-1 text-white'>
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
          <span className='text-placeholder relative pt-1 inline-flex focus:ring-0 focus:ring-offset-0 items-center px-2 text-sm bg-transparent rounded-l-md'>
            {props.label}:
          </span>
        )}{' '}
        <textarea
          placeholder={props.defaultVal !== undefined ? '' : props.label}
          {...register(props.name)}
          defaultValue={props.defaultVal !== undefined ? props.defaultVal : ''}
          className='overflow-auto scrollbar-textarea w-full caret-white border-0 focus:ring-0 text-white pr-12 resize-vertical h-16 min-h-[50px] placeholder-placeholder bg-transparent'
        ></textarea>
        <div className='pointer-events-none relative bottom-[0.55rem]'>
          <div className='pointer-events-none bg-post-bg right-0 w-[16px] h-[9px]  absolute'>
            <div className='relative top-[0.22rem] left-[0.25rem] rotate-[140deg] w-[14px] h-[1.2px] bg-input'></div>
            <div className='w-[7px] relative top-[5px] left-[10px] h-[1px] rotate-[140deg] bg-input'></div>
            <div
              className={`absolute bottom-0 right-0 ${
                error !== undefined ? 'bg-default-btn' : 'bg-placeholder'
              } w-[1px] h-[1px]`}
            ></div>
          </div>
        </div>
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

type TextareaTypes = {
  placeholder: string;
  lang: string;
};

const FeedTextarea: React.FC<TextareaTypes> = (props) => {
  return (
    <div className='my-2'>
      <div className='relative float-right right-9 top-1 text-white'>
        <p className='absolute'>{props.lang}</p>
      </div>
      <textarea
        placeholder={props.placeholder}
        className='w-full caret-white text-white pr-10 overflow-hidden focus:ring-0 focus:border-placeholder h-16 min-h-[50px] placeholder-placeholder border-[1px] border-placeholder bg-transparent h-16'
      ></textarea>
    </div>
  );
};

export default FeedTextarea;

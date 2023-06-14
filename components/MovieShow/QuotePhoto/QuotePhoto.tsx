import { FileCameraIcon } from '@/components';
import classes from '@/styles/Landing.module.css';
import useQuotePhoto from './useQuotePhoto';

const QuotePhoto: React.FC<{ thumbnail: string }> = (props) => {
  const { register, handleDragOver, handleDrop, img } = useQuotePhoto();

  return (
    <label>
      <input type='file' {...register('thumbnail')} className='hidden' />
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className='flex cursor-pointer justify-center items-center shadow rounded-xl w-full h-[350px] bg-cover'
        style={{
          backgroundImage: `url(${img !== null ? img : props.thumbnail})`,
        }}
      >
        <div
          className={`${classes['change-photo']} text-white flex items-center p-2 rounded-xl flex-col bg-red-500`}
        >
          <FileCameraIcon />
          <p>Change photo</p>
        </div>
      </div>
    </label>
  );
};

export default QuotePhoto;

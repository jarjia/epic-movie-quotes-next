import { FileCameraIcon } from '@/components/icons';
import useReplacePhoto from './useReplacePhoto';

const ReplacePhoto: React.FC<{ movieImage: string }> = (props) => {
  const { handleDragOver, handleDrop, img, t, register } = useReplacePhoto();

  return (
    <label>
      <input type='file' {...register('thumbnail')} className='hidden' />
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className='grid grid-cols-2 min-h-[130px] border-[1px] mt-4 border-placeholder'
      >
        <div
          className='w-full bg-cover h-full'
          style={{
            backgroundImage: `url(${img === null ? props.movieImage : img})`,
          }}
        ></div>
        <div className='flex items-center sm:items-start justify-center flex-col p-3 text-white gap-2'>
          <h2 className='text-title uppercase'>replace photo</h2>
          <p className='flex items-center gap-2 sm:hidden'>
            <FileCameraIcon /> {t('drag_drop')}
          </p>
          <span className='cursor-pointer bg-choose-file mx-2 sm:mx-0 p-2 rounded-sm'>
            {t('choose_file')}
          </span>
        </div>
      </div>
    </label>
  );
};

export default ReplacePhoto;

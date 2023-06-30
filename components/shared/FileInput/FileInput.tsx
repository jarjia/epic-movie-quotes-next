import { FileCameraIcon, ValidIcon } from '@/components';
import useFileInput from './useFileInput';

const FileInput = () => {
  const { handleDragOver, handleDrop, image, errors, register, t } =
    useFileInput();

  return (
    <div className='pb-2'>
      <label>
        <input type='file' {...register('thumbnail')} className='hidden' />
        <div
          onDrop={(e) => handleDrop(e)}
          onDragOver={handleDragOver}
          className={`flex items-center border-[1px] ${
            errors['thumbnail'] ? 'border-default-btn' : 'border-placeholder'
          } p-3 text-white gap-2`}
        >
          <FileCameraIcon />
          <div className='flex items-center w-full sm:hidden'>
            <div className='flex gap-2'>
              {image === undefined ? t('drag_drop') : t('uploaded')}
              {image !== undefined && <ValidIcon />}
            </div>
            <div className='cursor-pointer bg-choose-file mx-2 p-2 py-1 rounded'>
              {image === undefined ? t('choose_file') : t('reupload')}
            </div>
          </div>
          <div className='sm:flex w-full justify-between items-center hidden'>
            <p className='flex gap-2'>
              {image === undefined ? t('mobile_choose_file') : t('uploaded')}
              {image !== undefined && <ValidIcon />}
            </p>
            <p className='cursor-pointer bg-choose-file mx-2 p-2 py-1 rounded sm:rounded-none'>
              {image === undefined ? t('choose_file') : t('reupload')}
            </p>
          </div>
        </div>
      </label>
      <div>
        <p className='absolute text-default-btn text-sm tiny:text-tiny-font'>
          {errors['thumbnail']?.message as string}
        </p>
      </div>
    </div>
  );
};

export default FileInput;

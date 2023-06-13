import { FileCameraIcon } from '@/components';
import { useFormContext } from 'react-hook-form';

const FileInput = () => {
  const { register, setValue } = useFormContext();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setValue('thumbnail', e.dataTransfer.files);
  };

  return (
    <label>
      <input type='file' {...register('thumbnail')} className='hidden' />
      <div
        onDrop={(e) => handleDrop(e)}
        onDragOver={handleDragOver}
        className='flex items-center border-[1px] border-placeholder p-3 text-white gap-2'
      >
        <FileCameraIcon />
        <p className='block sm:hidden'>
          Drag & drop your image here or
          <span className='cursor-pointer bg-choose-file mx-2 p-2 py-1 rounded'>
            Choose file
          </span>
        </p>
        <div className='sm:flex w-full justify-between items-center hidden'>
          <p>Upload image</p>
          <p className='cursor-pointer bg-choose-file mx-2 p-2 py-1 rounded sm:rounded-none'>
            Choose file
          </p>
        </div>
      </div>
    </label>
  );
};

export default FileInput;

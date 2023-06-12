import { FileCameraIcon } from '@/components/icons';
import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ReplacePhoto: React.FC<{ movieImage: string }> = (props) => {
  const { register, control, setValue } = useFormContext();
  const [img, setImg] = useState<string | null>(null);
  const image = useWatch({ control, name: 'thumbnail' });

  useEffect(() => {
    if (image !== undefined) {
      setImg(URL.createObjectURL(image[0]));
    }
  }, [image]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setImg(e.dataTransfer.files);
    setValue('thumbnail', e.dataTransfer.files);
  };

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
            <FileCameraIcon /> Drag & drop your image here or
          </p>
          <span className='cursor-pointer bg-choose-file mx-2 sm:mx-0 p-2 rounded-sm'>
            Choose file
          </span>
        </div>
      </div>
    </label>
  );
};

export default ReplacePhoto;

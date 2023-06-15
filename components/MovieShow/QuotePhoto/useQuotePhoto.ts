import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const useQuotePhoto = () => {
  const { register, control, setValue } = useFormContext();
  const [img, setImg] = useState<FileList | string | null>(null);
  const image = useWatch({ control, name: 'thumbnail' });

  useEffect(() => {
    if (image !== undefined) {
      setImg(URL.createObjectURL(image[0]));
    }
  }, [image]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImg(e.dataTransfer.files);
    setValue('thumbnail', e.dataTransfer.files);
  };

  return {
    handleDragOver,
    handleDrop,
    register,
    img,
  };
};

export default useQuotePhoto;

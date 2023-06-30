import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const useFileInput = () => {
  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();
  const { t } = useTranslation('common');
  const image = useWatch({ control, name: 'thumbnail' });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setValue('thumbnail', e.dataTransfer.files);
  };

  return {
    handleDragOver,
    handleDrop,
    image,
    t,
    register,
    errors,
  };
};

export default useFileInput;

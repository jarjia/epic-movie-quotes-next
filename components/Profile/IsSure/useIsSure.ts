import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useIsSure = (handleIsSure: (bool: boolean) => void, name: string) => {
  const { t } = useTranslation('profile');
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (errors[name]) {
      handleIsSure(false);
    }
  }, [errors, handleIsSure, name]);

  return {
    t,
  };
};

export default useIsSure;

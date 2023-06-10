import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { UpdateInputTypes } from './types';
import { AppContext } from '@/context';
import { useTranslation } from 'next-i18next';

const useUpdateInput = (props: UpdateInputTypes) => {
  const { register } = useFormContext();
  const [isEdit, setIsEdit] = useState(false);
  const { cancel, handleCancel, handleEditing } = props;
  const { userData } = useContext(AppContext);
  const { t } = useTranslation('profile');
  let index = props.name;

  useEffect(() => {
    if (cancel) {
      setIsEdit(false);
      handleCancel(false);
    } else if (isEdit) {
      handleEditing(true);
    }
  }, [cancel, isEdit, handleCancel, handleEditing]);

  const handleIsEdit = () => {
    setIsEdit(true);
  };

  return {
    handleIsEdit,
    isEdit,
    register,
    userData,
    index,
    t,
  };
};

export default useUpdateInput;

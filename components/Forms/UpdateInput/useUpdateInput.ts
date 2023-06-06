import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { UpdateInputTypes } from './types';

const useUpdateInput = (props: UpdateInputTypes) => {
  const { register } = useFormContext();
  const [isEdit, setIsEdit] = useState(false);
  const { cancel, handleCancel, handleEditing } = props;

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
  };
};

export default useUpdateInput;

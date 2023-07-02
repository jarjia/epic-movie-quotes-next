import { useContext, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { UpdateInputTypes } from './types';
import { AppContext } from '@/context';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useUpdateInput = (props: UpdateInputTypes) => {
  const { register, control, resetField } = useFormContext();
  const [isEdit, setIsEdit] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const { cancel, handleCancel, handleEditing } = props;
  const { userData } = useContext(AppContext);
  const { t } = useTranslation('profile');
  let index = props.name;
  const inputRef = useRef<null | HTMLInputElement>(null);
  const password = useWatch({ control, name: 'password' });
  const router = useRouter();

  const handleInputWidth = () => {
    setInputWidth(inputRef.current?.offsetWidth as number);
  };

  useEffect(() => {
    setInputWidth(inputRef.current?.offsetWidth as number);
    window.addEventListener('resize', handleInputWidth);
    return () => {
      window.addEventListener('resize', handleInputWidth);
    };
  }, []);

  useEffect(() => {
    if (!isEdit) {
      if (props.name === 'password') {
        resetField('password');
        resetField('c_password');
      } else {
        resetField(props.name);
      }
    }
  }, [isEdit, props.name, resetField]);

  useEffect(() => {
    if (cancel) {
      setIsEdit(false);
      handleCancel(false);
    } else if (isEdit) {
      handleEditing(true);
    }
  }, [cancel, isEdit, handleCancel, handleEditing]);

  return {
    inputWidth,
    setIsEdit,
    isEdit,
    register,
    userData,
    router,
    index,
    t,
    inputRef,
    control,
    password,
  };
};

export default useUpdateInput;

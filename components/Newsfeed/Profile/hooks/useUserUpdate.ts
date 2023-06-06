import { AppContext } from '@/context';
import { UpdateProfileSchema } from '@/schema';
import { postUserUpdateProfile } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
  useWatch,
} from 'react-hook-form';

const useUserUpdate = (
  handleEditProfileClear: () => void,
  handleIsSuccess: (bool: boolean) => void
) => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(UpdateProfileSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = form;
  const { userData } = useContext(AppContext);
  const [cancel, setCancel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const [img, setImg] = useState<string | null>(null);

  const handleCancel = (bool: boolean) => {
    setCancel(bool);
    setImg(null);
    if (bool === true) {
      setIsEditing(false);
    }
  };

  const handleEditing = (bool: boolean) => {
    setIsEditing(bool);
  };

  const handleClearApiError = () => {
    setApiError('');
  };

  const thumbnail = useWatch({ control, name: 'thumbnail' });

  useEffect(() => {
    if (thumbnail !== undefined) {
      setImg(URL.createObjectURL(thumbnail[0]));
      setIsEditing(true);
    }
  }, [thumbnail]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.password) {
      formData.append('password', data.password);
    }
    if (thumbnail !== undefined) {
      formData.append('thumbnail', thumbnail[0]);
    }

    try {
      const res = await postUserUpdateProfile(formData);
      if (res.status === 200) {
        setCancel(true);
        setIsEditing(false);
        handleEditProfileClear();
        router.push('/profile');
        handleIsSuccess(true);
      }
    } catch (error: any) {
      setApiError(error?.response?.data);
    }
  };

  return {
    handleSubmit,
    img,
    handleEditing,
    handleCancel,
    cancel,
    isEditing,
    apiError,
    onSubmit,
    handleClearApiError,
    userData,
    FormProvider,
    control,
    errors,
    form,
    thumbnail,
  };
};

export default useUserUpdate;

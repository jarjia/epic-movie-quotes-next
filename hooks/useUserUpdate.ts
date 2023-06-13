import { AppContext } from '@/context';
import { useAuthService } from '@/services';
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
import { hookUserUpdateTypes } from '@/types';
import { useMutation } from 'react-query';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';

const useUserUpdate = ({
  handleEditProfileClear,
  handleIsSuccess,
  editProfile,
}: hookUserUpdateTypes) => {
  const { postUserUpdateProfile } = useAuthService();
  const { t } = useTranslation('profile');
  const { UpdateProfileSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(UpdateProfileSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = form;
  const { userData, handleRefetch } = useContext(AppContext);
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

  const isObjEmpty = (obj: {}) => {
    return Object.keys(obj).length === 0;
  };

  const handleEditing = (bool: boolean) => {
    setIsEditing(bool);
  };

  const handleClearApiError = () => {
    setApiError('');
  };

  const thumbnail = useWatch({ control, name: 'thumbnail' });
  const input = useWatch({ control, name: editProfile.name });

  useEffect(() => {
    if (thumbnail !== undefined) {
      setImg(URL.createObjectURL(thumbnail[0]));
      setIsEditing(true);
    }
  }, [thumbnail]);

  const { mutate: UpdateUserCredentials } = useMutation(postUserUpdateProfile, {
    onSuccess: () => {
      setCancel(true);
      setIsEditing(false);
      handleEditProfileClear();
      router.push('/profile');
      handleRefetch();
      handleIsSuccess(true);
    },
    onError: (error: any) => {
      setApiError(error?.response?.data);
    },
  });

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

    UpdateUserCredentials(formData);
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
    isObjEmpty,
    handleClearApiError,
    userData,
    FormProvider,
    control,
    errors,
    form,
    input,
    thumbnail,
    t,
  };
};

export default useUserUpdate;

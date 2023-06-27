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
import { PostEmailUpdateTypes, hookUserUpdateTypes } from '@/types';
import { useMutation, useQueryClient } from 'react-query';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useUserUpdate = ({
  handleEditProfileClear,
  handleIsSuccess,
  editProfile,
  handleIsSure,
}: hookUserUpdateTypes) => {
  const { postUserUpdateProfile, postUpdateUserEmail } = useAuthService();
  const { t } = useTranslation('profile');
  const { t: apiErr } = useTranslation('apiErrors');
  const { UpdateProfileSchema } = useZod();
  const queryClient = useQueryClient();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(UpdateProfileSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = form;
  const { userData, handleFeedFormStatus } = useContext(AppContext);
  const [cancel, setCancel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const [img, setImg] = useState<string | null>(null);
  const [enableEmail, setEnableEmail] = useState(true);

  const { mutate: updateEmailMutation } = useMutation(postUpdateUserEmail, {
    onSuccess() {
      handleFeedFormStatus('');
      router.push('/profile');
      queryClient.invalidateQueries('user');
      handleIsSuccess(true);
    },
    onError(err: any) {
      errorToast(apiErr, apiErr('email_update_failed'), err);
      setEnableEmail(false);
    },
  });

  useEffect(() => {
    if (!isEditing) {
      reset();
    }
  }, [isEditing, reset]);

  useEffect(() => {
    if (
      router.query.email !== undefined &&
      router.query.expires !== undefined
    ) {
      const expires = router.query.expires as string;
      const targetDate = new Date(expires);

      const interval = setInterval(() => {
        const currentTime = new Date();

        const elapsedMinutes = Math.floor(
          (currentTime.getTime() - targetDate.getTime()) / (1000 * 60)
        );

        if (elapsedMinutes >= 30) {
          clearInterval(interval);
          handleFeedFormStatus('link-expired');
        } else {
          if (router.query.update_token !== undefined) {
            let email = router.query.email as string;
            let update_token = router.query.update_token as string;
            let user_id = router.query.user_id as string;
            const data: PostEmailUpdateTypes = {
              email,
              update_token,
              user_id,
            };
            const { pathname, asPath, query } = router;
            router.push({ pathname, query }, asPath, {
              locale: router.query.locale as string,
            });
            if (enableEmail) {
              updateEmailMutation(data);
            }
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [
    handleFeedFormStatus,
    router.query.user_id,
    router.query.email,
    router.query.expires,
    router.query.update_token,
    updateEmailMutation,
  ]);

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

  const { mutate: UpdateUserCredentials, isLoading: updateProfileLoading } =
    useMutation(postUserUpdateProfile, {
      onSuccess: () => {
        let isEmail = false;
        if (!!form.getValues('email')) {
          handleFeedFormStatus('email-sent');
          isEmail = true;
        }
        setCancel(true);
        setIsEditing(false);
        handleEditProfileClear();
        router.push('/profile');
        queryClient.invalidateQueries('user');
        if (!router.query.update_token && !isEmail) {
          handleIsSuccess(true);
        }
      },
      onError: (error: any) => {
        let shouldNotify = true;
        const emailErrors = error?.response?.data?.errors?.email;
        const passwordError = error?.response?.data?.password;

        if (emailErrors?.length > 0) {
          shouldNotify = false;
          setError('email', {
            message: emailErrors[0],
          });
          handleIsSure(false);
        }
        if (passwordError) {
          shouldNotify = false;
          setError('password', {
            message: passwordError,
          });
          handleIsSure(false);
        }
        if (shouldNotify) {
          errorToast(apiErr, apiErr('profile_update_failed'), error);
        }
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.email) {
      formData.append('email', data.email);
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
    updateProfileLoading,
    input,
    thumbnail,
    t,
  };
};

export default useUserUpdate;

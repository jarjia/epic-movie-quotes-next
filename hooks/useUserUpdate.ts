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
import { PostEmailUpdate, HookUserUpdate } from '@/types';
import { useMutation, useQueryClient } from 'react-query';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';
import { SpecificFieldEditType } from './types';

const useUserUpdate = ({
  handleEditProfileClear,
  handleIsSuccess,
  editProfile,
  handleIsSure,
}: HookUserUpdate) => {
  const { postUserUpdateProfile, postUpdateUserEmail } = useAuthService();
  const { t } = useTranslation('profile');
  const { t: apiErr } = useTranslation('apiErrors');
  const { UpdateProfileSchema } = useZod();
  const queryClient = useQueryClient();
  const form: UseFormReturn = useForm({
    mode: 'onBlur',
    resolver: zodResolver(UpdateProfileSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    trigger,
    reset,
  } = form;
  const { userData, handleFeedFormStatus, feedFormStatus } =
    useContext(AppContext);
  const [cancel, setCancel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const [img, setImg] = useState<string | null>(null);
  const [enableEmail, setEnableEmail] = useState(true);
  const password = useWatch({ control, name: 'password' });
  const thumbnail = useWatch({ control, name: 'thumbnail' });
  const defaultEdit: SpecificFieldEditType[] = [
    {
      id: 'name',
      boolean: false,
    },
    {
      id: 'email',
      boolean: false,
    },
    {
      id: 'password',
      boolean: false,
    },
  ];
  const [allEdit, setAllEdit] = useState<SpecificFieldEditType[]>(defaultEdit);

  const handleIsAllEditing = (boolean: boolean, id: string) => {
    setAllEdit((prev) => {
      let newItem = {
        id,
        boolean,
      };
      let newArr = prev.filter((item) => item.id !== id);
      newArr.push(newItem);

      return newArr;
    });
  };

  const handleClearRoute = () => {
    router.push('/profile', undefined, {
      locale: router.query.locale as string,
    });
  };

  const { mutate: updateEmailMutation } = useMutation(postUpdateUserEmail, {
    onSuccess() {
      handleFeedFormStatus('');
      queryClient.invalidateQueries('user');
      handleIsSuccess(true);
    },
    onError(err: any) {
      setEnableEmail(false);
      if (
        err?.response?.status === 401 &&
        feedFormStatus !== 'link-expired' &&
        router.query.update_token !== undefined
      ) {
        handleFeedFormStatus('link-expired');
      } else {
        errorToast(apiErr, apiErr('email_update_failed'), err);
      }
    },
    onSettled() {
      handleClearRoute();
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
      if (router.query.update_token !== undefined) {
        let email = router.query.email as string;
        let update_token = router.query.update_token as string;
        let user_id = router.query.user_id as string;
        let expires = router.query.expires as string;
        const data: PostEmailUpdate = {
          email,
          update_token,
          user_id,
          expires,
        };
        if (enableEmail) {
          updateEmailMutation(data);
        }
      }
    }
  }, [
    router.query,
    enableEmail,
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
        handleEditProfileClear({
          name: '',
          label: '',
          placeholder: '',
          isEdit: false,
          type: '',
        });
        router.push('/profile');
        queryClient.invalidateQueries('user');
        if (!router.query.update_token && !isEmail) {
          handleIsSuccess(true);
        }
      },
      onError: (error: any) => {
        let shouldNotify = true;
        const err = error?.response?.data?.errors;
        const emailErrors = err?.email;
        const passwordError = error?.response?.data?.password;
        const nameErrors = err?.name;

        if (nameErrors?.length > 0) {
          const inputElement: HTMLInputElement | null =
            document.querySelector('input[name="name"]');
          inputElement?.focus();
        } else if (emailErrors?.length > 0) {
          const inputElement: HTMLInputElement | null = document.querySelector(
            'input[name="email"]'
          );
          inputElement?.focus();
        } else if (passwordError) {
          const inputElement: HTMLInputElement | null = document.querySelector(
            'input[name="password"]'
          );
          inputElement?.focus();
        }

        if (nameErrors?.length > 0) {
          shouldNotify = false;
          setError('name', {
            message: nameErrors[0],
          });
          handleIsSure(false);
        }
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

  let shouldEdit =
    thumbnail !== undefined ||
    (isEditing && allEdit.some((item) => item.boolean));

  return {
    shouldEdit,
    handleSubmit,
    img,
    handleEditing,
    handleCancel,
    cancel,
    isEditing,
    apiError,
    onSubmit,
    isObjEmpty,
    setApiError,
    userData,
    allEdit,
    handleIsAllEditing,
    FormProvider,
    control,
    password,
    errors,
    form,
    updateProfileLoading,
    trigger,
    input,
    thumbnail,
    t,
  };
};

export default useUserUpdate;

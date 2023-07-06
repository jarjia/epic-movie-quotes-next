import { MobileInputTypes } from '@/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { AppContext } from '@/context';

const useProfile = () => {
  const editProfileInitials = useMemo(() => {
    return {
      name: '',
      label: '',
      placeholder: '',
      isEdit: false,
      type: '',
    };
  }, []);

  const [editProfile, setEditProfile] =
    useState<MobileInputTypes>(editProfileInitials);
  const [isSure, setIsSure] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('profile');
  const { feedFormStatus, handleFeedFormStatus, currentQuoteId } =
    useContext(AppContext);

  useEffect(() => {
    if (!editProfile.isEdit && isSure) {
      setIsSure(false);
    }
  }, [isSure, editProfile]);

  useEffect(() => {
    const handleClearOnDesktop = () => {
      if (window.innerWidth > 915) {
        setEditProfile(editProfileInitials);
      }
    };

    handleClearOnDesktop();
    window.addEventListener('resize', handleClearOnDesktop);
    return () => {
      window.removeEventListener('resize', handleClearOnDesktop);
    };
  }, [editProfileInitials]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(() => {
    let allowedModalsArr = ['link-expired', 'email-sent', 'view-quote', ''];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  const handleClearForms = () => {
    sessionStorage.removeItem('form-status');
    sessionStorage.removeItem('feed-form-status');
    router.push('/profile');
  };

  const handleIsSuccess = (bool: boolean) => {
    setIsSuccess(bool);
  };

  const handleEditProfile = (data: MobileInputTypes) => {
    setEditProfile(data);
  };

  const handleIsSure = (bool: boolean) => {
    setIsSure(bool);
  };

  const handleEditProfileClear = () => {
    setEditProfile(editProfileInitials);
  };
  console.log(router);

  const handleBackButton = () => {
    if (editProfile.isEdit === true) {
      setEditProfile((prev: MobileInputTypes) => {
        return { ...prev, isEdit: false };
      });
    } else {
      router.push('/newsfeed');
    }
  };

  return {
    handleBackButton,
    isSure,
    handleEditProfile,
    handleClearForms,
    t,
    handleEditProfileClear,
    handleIsSure,
    handleIsSuccess,
    isSuccess,
    editProfile,
    feedFormStatus,
    currentQuoteId,
  };
};

export default useProfile;

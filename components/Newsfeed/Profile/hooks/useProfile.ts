import { MobileInputTypes } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useProfile = () => {
  const [editProfile, setEditProfile] = useState<MobileInputTypes>({
    name: '',
    label: '',
    placeholder: '',
    isEdit: false,
    type: '',
  });
  const [isSure, setIsSure] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!editProfile.isEdit && isSure) {
      setIsSure(false);
    }
  }, [isSure, editProfile]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

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
    setEditProfile({
      name: '',
      label: '',
      placeholder: '',
      isEdit: false,
      type: '',
    });
  };

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
    handleEditProfileClear,
    handleIsSure,
    handleIsSuccess,
    isSuccess,
    editProfile,
  };
};

export default useProfile;

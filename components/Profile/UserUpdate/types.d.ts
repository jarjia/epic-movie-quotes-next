import { MobileInputTypes } from '@/types';

export type UserUpdateTypes = {
  handleEditProfileClear: () => void;
  handleEditProfile: (data: MobileInputTypes) => void;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInputTypes;
};

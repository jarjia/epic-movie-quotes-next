import { MobileInput } from '@/types';

export type UserUpdate = {
  handleEditProfileClear: () => void;
  handleEditProfile: (data: MobileInput) => void;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInput;
  handleIsSure: (bool: boolean) => void;
};

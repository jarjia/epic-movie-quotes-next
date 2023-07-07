import { MobileInput, SetState } from '@/types';

export type UserUpdate = {
  handleEditProfileClear: SetState;
  handleEditProfile: (data: MobileInput) => void;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInput;
  handleIsSure: (bool: boolean) => void;
};

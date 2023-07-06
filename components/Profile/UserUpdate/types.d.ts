import { MobileInput, setState } from '@/types';

export type UserUpdate = {
  handleEditProfileClear: setState;
  handleEditProfile: (data: MobileInput) => void;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInput;
  handleIsSure: (bool: boolean) => void;
};

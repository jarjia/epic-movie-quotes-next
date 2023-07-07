import { MobileEdit, MobileInput, setState } from '@/types';

export type MobileInputUpdate = {
  editProfile: MobileInput;
  handleEditProfileClear: setState<MobileEdit>;
  handleIsSure: (bool: boolean) => void;
  isSure: boolean;
  handleIsSuccess: (bool: boolean) => void;
};

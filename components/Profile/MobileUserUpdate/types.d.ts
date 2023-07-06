import { MobileInput } from '@/types';

export type MobileInputUpdate = {
  editProfile: MobileInput;
  handleEditProfileClear: () => void;
  handleIsSure: (bool: boolean) => void;
  isSure: boolean;
  handleIsSuccess: (bool: boolean) => void;
};

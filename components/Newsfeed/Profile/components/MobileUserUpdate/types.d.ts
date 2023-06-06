import { MobileInputTypes } from '@/types';

export type MobileInputUpdateTypes = {
  editProfile: MobileInputTypes;
  handleEditProfileClear: () => void;
  handleIsSure: (bool: boolean) => void;
  isSure: boolean;
  handleIsSuccess: (bool: boolean) => void;
};

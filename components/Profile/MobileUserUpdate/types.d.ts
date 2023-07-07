import { MobileEdit, MobileInput, SetState } from '@/types';

export type MobileInputUpdate = {
  editProfile: MobileInput;
  handleEditProfileClear: SetState<MobileEdit>;
  handleIsSure: (bool: boolean) => void;
  isSure: boolean;
  handleIsSuccess: (bool: boolean) => void;
};

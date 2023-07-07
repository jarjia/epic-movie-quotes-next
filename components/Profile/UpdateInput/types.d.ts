import { setState } from '@/types';

export type UpdateInput = {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  newLabel: string;
  defaultValue: string;
  cancel?: boolean;
  handleCancel: (bool) => void;
  setIsEditing: setState;
  handleEditProfile: (bool) => void;
  handleIsAllEditing: (boolean, id) => void;
  allEdit: { id: string; boolean: boolean }[];
  repeatName: string;
  repeatLabel?: string;
  errors?: any;
  isGoogle?: boolean;
};

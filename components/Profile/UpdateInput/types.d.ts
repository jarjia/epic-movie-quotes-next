export type UpdateInputTypes = {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  newLabel: string;
  defaultValue: string;
  cancel?: boolean;
  handleCancel: (bool) => void;
  handleEditing: (bool) => void;
  handleEditProfile: (bool) => void;
  repeatName: string;
  repeatLabel?: string;
  errors?: any;
};

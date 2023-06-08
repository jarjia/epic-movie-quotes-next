export type HandleFormStatusTypes = {
  handleFormStatus: (status: string) => void;
};
export type LoginWithGoogleQueryTypes = {
  code: string;
  authUser: string;
  prompt: string;
  scope: string;
};

export type MobileInputTypes = {
  name: string;
  label: string;
  placeholder: string;
  isEdit: boolean;
  type: string;
};
export type UserDataTypes = {
  name: string;
  id: number;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  google_id: string;
  thumbnail?: string;
};
export type hookUserUpdateTypes = {
  handleEditProfileClear: () => void;
  handleIsSuccess: (bool: boolean) => void;
  editProfile: MobileInputTypes;
};
export type MovieCreateTypes = {
  movie: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
  releaseDate: string;
  thumbnail: {};
};
export type MovieStructureTypes = {
  id: number;
  releaseDate: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  movie: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
};

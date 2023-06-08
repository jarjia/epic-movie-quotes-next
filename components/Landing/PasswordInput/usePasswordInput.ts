import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const usePasswordInput = (name: string) => {
  const {
    register,
    formState: { touchedFields },
    control,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const input = useWatch({ control, name });

  const handleTogglePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    register,
    input,
    touchedFields,
    handleTogglePasswordShow,
  };
};

export default usePasswordInput;

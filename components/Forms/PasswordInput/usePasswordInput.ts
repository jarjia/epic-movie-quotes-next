import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const usePasswordInput = () => {
  const {
    register,
    formState: { touchedFields },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    register,
    touchedFields,
    handleTogglePasswordShow,
  };
};

export default usePasswordInput;

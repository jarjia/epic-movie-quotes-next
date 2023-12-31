import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const usePasswordInput = (name: string) => {
  const {
    register,
    formState: { touchedFields },
    control,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const input = useWatch({ control, name });

  return {
    showPassword,
    router,
    setShowPassword,
    register,
    input,
    touchedFields,
  };
};

export default usePasswordInput;

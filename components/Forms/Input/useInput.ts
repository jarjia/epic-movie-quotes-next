import { useFormContext, useWatch } from 'react-hook-form';

const useInput = (name: string) => {
  const {
    register,
    control,
    formState: { touchedFields },
  } = useFormContext();

  const input = useWatch({ control, name: name });

  return {
    input,
    register,
    touchedFields,
  };
};

export default useInput;

import { UseFormReturn, useForm } from 'react-hook-form';

const useAddQuote = () => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
  });
  const { handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return {
    handleSubmit,
    form,
    onSubmit,
  };
};

export default useAddQuote;

import { FeedBaseTextarea } from './types';
import { useFormContext } from 'react-hook-form';

const useFeedTextarea = (props: FeedBaseTextarea) => {
  const { register } = useFormContext();
  let error =
    props.lang === 'Eng'
      ? props.errors[props.errorName]?.en
      : props.errors[props.errorName]?.ka;
  const isEdit = props.defaultVal === undefined ? false : true;

  return {
    error,
    isEdit,
    register,
  };
};

export default useFeedTextarea;

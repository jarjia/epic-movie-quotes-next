import { useFormContext } from 'react-hook-form';
import { Checkbox } from './types';

const Checkbox: React.FC<Checkbox> = (props) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        className='text-checkbox rounded focus:ring-offset-0 focus:ring-0 or focus:ring-transparent'
        type='checkbox'
        {...register(props.name)}
        name={props.name}
        id={props.name}
      />
      <label className='block text-white' htmlFor={props.name}>
        {props.label}
      </label>
    </>
  );
};

export default Checkbox;

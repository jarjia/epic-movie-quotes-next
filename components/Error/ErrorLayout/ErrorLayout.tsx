import classes from '@/styles/Landing.module.css';
import { ErrorLayoutTypes } from './types';

const ErrorLayout: React.FC<ErrorLayoutTypes> = (props) => {
  return (
    <div
      className={`flex justify-center items-center ${classes['error-linear']} w-screen h-screen`}
    >
      {props.children}
    </div>
  );
};

export default ErrorLayout;

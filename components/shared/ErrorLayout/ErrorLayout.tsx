import { ErrorLayout } from './types';

const ErrorLayout: React.FC<ErrorLayout> = (props) => {
  return (
    <div
      className={`flex justify-center items-center error-linear w-screen h-screen`}
    >
      {props.children}
    </div>
  );
};

export default ErrorLayout;

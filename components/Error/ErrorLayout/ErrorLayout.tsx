import classes from '@/styles/Landing.module.css';
type ErrorLayoutTypes = {
  children: JSX.Element;
};

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

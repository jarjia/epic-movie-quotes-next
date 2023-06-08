import { CloseIconTypes } from './types';

const Closeicon: React.FC<CloseIconTypes> = (props) => {
  // 10
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      className={`${props.color ? 'fill-[#000000]' : 'fill-white'} ${
        props.isSmall ? 'w-[10px] h-[10px]' : ''
      } rotate-45`}
      fill='white'
      fillRule='evenodd'
    >
      <path
        fillRule='evenodd'
        d='M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z'
      />
    </svg>
  );
};

export default Closeicon;

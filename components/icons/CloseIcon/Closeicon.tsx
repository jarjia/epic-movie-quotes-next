import { CloseIconTypes } from './types';

const Closeicon: React.FC<CloseIconTypes> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={props.isSmall ? '10px' : '24px'}
      height={props.isSmall ? '10px' : '24px'}
      className='rotate-45'
      fill={props.color ? '#000000' : 'white'}
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

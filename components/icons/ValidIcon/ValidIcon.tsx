import { useRouter } from 'next/router';

const ValidIcon: React.FC = () => {
  const router = useRouter();

  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      className={
        router.pathname === '/profile' || router.pathname === '/'
          ? 'absolute'
          : 'relative'
      }
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_17581_28027)'>
        <rect width='18' height='18' fill='white' fillOpacity='0' />
        <path
          d='M5.17405 15.1421L1.34905 10.1921C0.449053 7.85212 2.38405 7.04212 3.82405 8.39212L6.29905 11.5421L13.9491 2.99212C15.2991 1.57462 17.5491 2.38461 16.6491 4.56712L7.64905 14.9171C6.68155 16.0421 5.84905 15.8171 5.17405 15.1421Z'
          fill='#198754'
        />
      </g>
      <defs>
        <clipPath id='clip0_17581_28027'>
          <rect width='18' height='18' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ValidIcon;

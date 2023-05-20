import classes from '@/styles/Landing.module.css';

const Footer: React.FC = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer className={classes['footer-linear']}>
      <div className='px-16 py-4 sm:px-8'>
        <h5 className='text-title uppercase sm:text-xs'>
          © {currentYear} movie quotes. All rights reserved.
        </h5>
      </div>
    </footer>
  );
};

export default Footer;

import classes from '@/styles/Landing.module.css';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('landing');

  return (
    <footer className={classes['footer-linear']}>
      <div className='px-16 py-4 sm:px-8'>
        <h5 className='text-title uppercase sm:text-xs'>
          © {new Date().getFullYear()} {t('footer')}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;

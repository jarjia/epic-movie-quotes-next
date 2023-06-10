import {
  Title,
  Navbar,
  Footer,
  QuoteArticle,
  FormLayout,
  RegisterForm,
  LoginForm,
  EmailSent,
  Verified,
  RecoverEmail,
  RecoverEmailSent,
  RecoverPassword,
  PasswordRecovered,
  LinkExpired,
} from '@/components';
import classes from '@/styles/Landing.module.css';
import useMain from './useMain';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'next-i18next';

const Main: React.FC = () => {
  const { handleFormStatus, formStatus } = useMain();
  const { t } = useTranslation('landing');

  return (
    <section className={`${classes.linear} max-w-screen`}>
      <ToastContainer className='w-80 bg-white h-16 rounded-xl text-red-500 text-center flex justify-center items-center absolute left-[39%] top-4 z-[100]' />
      {formStatus !== ('null' || null || undefined) ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          {formStatus === 'register' ? (
            <RegisterForm handleFormStatus={handleFormStatus} />
          ) : formStatus === 'login' ? (
            <LoginForm handleFormStatus={handleFormStatus} />
          ) : formStatus === 'email-sent' ? (
            <EmailSent handleFormStatus={handleFormStatus} />
          ) : formStatus === 'verified' ? (
            <Verified handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recover-email' ? (
            <RecoverEmail handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recover-email-sent' ? (
            <RecoverEmailSent handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recover-password' ? (
            <RecoverPassword handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recovered-password' ? (
            <PasswordRecovered handleFormStatus={handleFormStatus} />
          ) : formStatus === 'link-expired' ? (
            <LinkExpired handleFormStatus={handleFormStatus} />
          ) : (
            <section></section>
          )}
        </FormLayout>
      ) : null}
      <Navbar handleFormStatus={handleFormStatus} />
      <Title handleFormStatus={handleFormStatus} />
      <QuoteArticle
        image='/assets/images/interstellar.png'
        quote={t('interstellar_quote')}
        date={`${t('interstellar')}, 2014`}
        movieId={1}
      />
      <QuoteArticle
        image='/assets/images/movie-two.png'
        quote={t('the_royal_tenenbaums_quote')}
        date={`${t('the_royal_tenenbaums')}, 2001`}
        movieId={2}
      />
      <QuoteArticle
        image='/assets/images/lotr.png'
        quote={t('lotr_quote')}
        date={`${t('lotr')}, 2001`}
        movieId={3}
      />
      <Footer />
    </section>
  );
};

export default Main;

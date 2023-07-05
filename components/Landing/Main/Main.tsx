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
import 'react-toastify/dist/ReactToastify.css';

const Main: React.FC = () => {
  const { handleFormStatus, formStatus, t, shouldGetRedirect } = useMain();

  if (shouldGetRedirect) {
    return <div className='w-screen h-screen bg-post-bg z-[999]'></div>;
  }

  return (
    <section className={`${classes.linear} max-w-screen`}>
      <ToastContainer autoClose={3000} className='select-none' />
      {formStatus !== ('null' || null || undefined) ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          {formStatus === 'register' ? (
            <RegisterForm handleFormStatus={handleFormStatus} />
          ) : formStatus === 'login' ? (
            <LoginForm handleFormStatus={handleFormStatus} />
          ) : formStatus === 'email-sent' ? (
            <EmailSent isProfile={false} handleFormStatus={handleFormStatus} />
          ) : formStatus === 'verified' ? (
            <Verified isLanding={true} handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recover-email' ? (
            <RecoverEmail handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recover-email-sent' ? (
            <RecoverEmailSent handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recover-password' ? (
            <RecoverPassword handleFormStatus={handleFormStatus} />
          ) : formStatus === 'recovered-password' ? (
            <PasswordRecovered handleFormStatus={handleFormStatus} />
          ) : formStatus === 'link-expired' ? (
            <LinkExpired
              isProfile={false}
              handleFormStatus={handleFormStatus}
            />
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

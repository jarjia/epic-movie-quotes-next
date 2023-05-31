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

const Main: React.FC = () => {
  const { handleFormStatus, formStatus } = useMain();

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
        quote='You have to leave something behind to go forward'
        date='Interstellar, 2014'
        movieId={1}
      />
      <QuoteArticle
        image='/assets/images/movie-two.png'
        quote='I think we’re just gonna have to be secretly in love with each other and leave it that'
        date='The Royal Tenenbaums,2001'
        movieId={2}
      />
      <QuoteArticle
        image='/assets/images/lotr.png'
        quote='I think we’re just gonna have to be secretly in love with each other and leave it that'
        date='The Royal Tenenbaums,2001'
        movieId={3}
      />
      <Footer />
    </section>
  );
};

export default Main;

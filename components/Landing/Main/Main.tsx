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

const Main: React.FC = () => {
  const { handleFormStatus, formStatus } = useMain();

  return (
    <section className={`${classes.linear} max-w-screen`}>
      {formStatus === 'register' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <RegisterForm handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'login' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <LoginForm handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'email-sent' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <EmailSent handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'verified' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <Verified handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'recover-email' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <RecoverEmail handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'recover-email-sent' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <RecoverEmailSent handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'recover-password' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <RecoverPassword handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'recovered-password' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <PasswordRecovered handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : formStatus === 'link-expired' ? (
        <FormLayout handleFormStatus={handleFormStatus}>
          <LinkExpired handleFormStatus={handleFormStatus} />
        </FormLayout>
      ) : null}
      <Navbar handleFormStatus={handleFormStatus} />
      <Title />
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

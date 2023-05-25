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
} from '@/components';
import classes from '@/styles/Landing.module.css';
import useMain from './useMain';

const Main: React.FC = () => {
  const { handleFormStatus, formStatus } = useMain();

  return (
    <section className={`${classes.linear} max-w-screen`}>
      {formStatus !== 'null' ? (
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
          ) : (
            <div></div>
          )}
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

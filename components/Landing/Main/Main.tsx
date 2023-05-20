import { Title, Navbar, Footer, QuoteArticle } from '@/components';
import classes from '@/styles/Landing.module.css';

const Main: React.FC = () => {
  return (
    <section className={`${classes.linear} max-w-screen`}>
      <Navbar />
      <Title />
      <QuoteArticle
        image='/assets/images/interstellar.png'
        quote='You have to leave something behind to go forward'
        date='Interstellar, 2014'
      />
      <QuoteArticle
        image='/assets/images/movie-two.png'
        quote='I think we’re just gonna have to be secretly in love with each other and leave it that'
        date='The Royal Tenenbaums,2001 '
      />
      <QuoteArticle
        image='/assets/images/lotr.png'
        quote='I think we’re just gonna have to be secretly in love with each other and leave it that'
        date='The Royal Tenenbaums,2001 '
      />
      <Footer />
    </section>
  );
};

export default Main;

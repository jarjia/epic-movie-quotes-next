import { QuoteArticleTypes } from './types';

const QuoteArticle: React.FC<QuoteArticleTypes> = (props) => {
  const quotePadding =
    props.movieId === 1 ? 'pb-24' : props.movieId === 3 ? 'pt-24' : '';

  return (
    <article
      className={`bg-landing-back-img ${
        props.movieId === 3 ? 'sm:bg-right' : 'sm:bg-center'
      } bg-fixed bg-cover bg-no-repeat h-screen w-full`}
      style={{
        backgroundImage: `linear-gradient(to right, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%), 
        linear-gradient(to ${
          props.movieId === 3 ? 'top' : 'bottom'
        }, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%), url(${
          props.image
        })`,
      }}
    >
      <div
        className={`flex flex-col sm:pl-[60px] ${quotePadding} justify-center pl-[120px] w-full h-full`}
      >
        <div>
          <div>
            <div className='relative right-[53px] top-[35px] w-[43px] sm:w-[17px] sm:right-[33px] sm:top-[15px] border-[1px] border-white bg-white'></div>
            <p className='font-bold text-white text-quote-size sm:text-xl w-4/6'>
              “{props.quote}”
            </p>
          </div>
        </div>
        <div className='mt-2'>
          <p className='text-2xl text-white sm:text-base'>{props.date}</p>
        </div>
      </div>
    </article>
  );
};

export default QuoteArticle;

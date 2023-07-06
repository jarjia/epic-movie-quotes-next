import { FeedTextareaForFeed, FileInput } from '@/components';
import { FormProvider } from 'react-hook-form';
import useAddQuoteFromMovieModal from './useAddQuoteFromMovieModal';
import { AddQuoteFromMovieModalTypes } from './types';

const AddQuoteFromMovieModal: React.FC<AddQuoteFromMovieModalTypes> = (
  props
) => {
  const { handleSubmit, onSubmit, errors, form, locale, t, addQuoteLoading } =
    useAddQuoteFromMovieModal(props.movie.id);

  return (
    <FormProvider {...form}>
      <div className='grid sm:bg-black grid-cols-quote-card mt-6 sm:rounded sm:py-4 sm:px-1'>
        <div
          className='w-full max-h-[150px] bg-cover bg-horizon-center rounded-xl'
          style={{
            backgroundImage: `url(${props.movie.thumbnail})`,
          }}
        ></div>
        <div className='pl-4'>
          <h2 className='flex text-title text-xl'>
            <p className='text-xl truncate'>{props.movie.movie[locale]}</p>
            <p className='text-xl pl-1'>({props.movie.releaseDate})</p>
          </h2>
          <div className='sm:flex sm:flex-col-reverse'>
            <div className='flex w-full flex-wrap py-4 gap-1 large:gap-2 sm:gap-2 sm:max-h-full max-h-[100px] sm:overflow-y-auto overflow-y-scroll scrollbar'>
              {props.movie.genres &&
                props.movie.genres.map((genre) => {
                  return (
                    <div
                      key={genre.id}
                      className='flex sm:text-sm sm:px-2 rounded-sm items-center bg-placeholder text-white px-3 py-[2px]'
                    >
                      <p>{genre.genre[locale]}</p>
                    </div>
                  );
                })}
            </div>
            <h3 className='text-placeholder truncate sm:text-white mt-2'>
              {t('movie_show_director')}
              <span className='pl-2 text-white truncate'>
                {props.movie.director[locale]}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='sm:flex sm:flex-col-reverse'>
          <div>
            <FeedTextareaForFeed
              label='create new quote'
              name='quote[en]'
              lang='Eng'
              errorName='quote'
              errors={errors}
            />
            <FeedTextareaForFeed
              label='ახალი ციტატა'
              name='quote[ka]'
              lang='ქარ'
              errorName='quote'
              errors={errors}
            />
          </div>
          <div className='my-2'>
            <FileInput />
          </div>
        </div>
        <button
          type='submit'
          disabled={addQuoteLoading}
          className={`${
            addQuoteLoading
              ? 'bg-disabled'
              : 'bg-default-btn active:bg-active hover:bg-hover'
          } mt-4 mt-2 sm:py-2 text-white w-full rounded py-2`}
        >
          {t('post_quote_submit')}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddQuoteFromMovieModal;

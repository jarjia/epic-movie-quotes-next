const Title: React.FC = () => {
  return (
    <section>
      <div className='flex flex-col justify-center items-center h-[calc(100vh-100px)]'>
        <div>
          <h1 className='text-title text-h1 font-bold text-center tracking-[1px] sm:text-2xl'>
            Find any quote in<br></br> millions of movie lines
          </h1>
        </div>
        <div className='mt-4'>
          <button className='text-white capitalize rounded px-6 py-[8px] bg-default-btn hover:bg-hover active:bg-active'>
            get started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Title;

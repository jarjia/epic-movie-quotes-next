const SelectMovie = () => {
  return (
    <div className='mt-4'>
      <select className='text-white bg-black border-0 w-full sm:py-4'>
        <option value='' disabled selected>
          Choose Movie
        </option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
    </div>
  );
};

export default SelectMovie;

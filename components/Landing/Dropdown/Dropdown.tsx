import { DropDownIcon } from '@/components';
import Link from 'next/link';
import useDropdown from '../Dropdown/useDropdown';

const Dropdown: React.FC = () => {
  const { handleDropDown, shouldDropDown } = useDropdown();

  return (
    <div className='sm:hidden'>
      <button
        className='text-white capitalize tracking-[1px] gap-2 px-4 py-2.5 text-center inline-flex items-center'
        type='button'
        onClick={handleDropDown}
      >
        Eng
        <div className='mt-1'>
          <DropDownIcon />
        </div>
      </button>
      {shouldDropDown && (
        <div className='z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow'>
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
            <li>
              <Link
                href='#'
                onClick={handleDropDown}
                className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                English
              </Link>
            </li>
            <li>
              <Link
                href='#'
                onClick={handleDropDown}
                className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                ქართული
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

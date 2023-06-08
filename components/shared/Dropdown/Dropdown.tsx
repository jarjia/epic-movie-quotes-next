import { DropDownIcon } from '@/components';
import Link from 'next/link';
import useDropdown from './useDropdown';

const Dropdown: React.FC<{ isNotification: boolean }> = (props) => {
  const { handleDropDown, shouldDropDown } = useDropdown();

  return (
    <>
      {shouldDropDown && (
        <div
          className='absolute top-0 z-[99] left-0 w-screen h-screen'
          onClick={handleDropDown}
        ></div>
      )}
      <div className={`sm:hidden z-[${props.isNotification ? '90' : '99'}]`}>
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
    </>
  );
};

export default Dropdown;

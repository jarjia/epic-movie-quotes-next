import { DropDown } from '@/components';
import { NavbarTypes } from './types';

const Navbar: React.FC<NavbarTypes> = (props) => {
  return (
    <nav className='flex justify-between items-center sm:px-4 px-16 py-5 fixed bg-transparent w-full'>
      <div>
        <h3 className='text-title uppercase sm:text-base'>Movie quotes</h3>
      </div>
      <div className='flex gap-8'>
        <DropDown />
        <div className='flex gap-8 sm:gap-3'>
          <div>
            <button
              onClick={() => props.handleToggleRegister(true)}
              className='text-white rounded sm:px-4 sm:py-[4px] px-6 py-[8px] bg-default-btn hover:bg-hover active:bg-active'
            >
              Sign Up
            </button>
          </div>
          <div>
            <button
              onClick={() => props.handleToggleLogin(true)}
              className='text-white rounded sm:px-4 sm:py-[3px] px-6 py-[7px] border-2 border-white'
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
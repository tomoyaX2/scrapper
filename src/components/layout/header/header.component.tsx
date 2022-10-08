import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeLoginModalVisible,
  changeRegistrationModalVisible
} from 'src/store/auth';
import { cleanUser } from 'src/store/user';
import { Button } from 'src/components/common/button';
import { PersonIcon } from 'src/components/common/icons/person';
import { Login } from 'src/components/layout/header/login/login.component';
import { PopoverWindow } from 'src/components/common/popoverWindow';
import { Registration } from 'src/components/layout/header/registration/registration.component';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const onRegistrationModalOpen = () => {
    dispatch(changeRegistrationModalVisible());
  };

  const onLoginModalOpen = () => {
    dispatch(changeLoginModalVisible());
  };

  const onLogout = () => {
    dispatch(cleanUser());
  };

  return (
    <header className='bg-primary flex items-center justify-between md:px-10 sm:px-2 xsm:px-2 py-4'>
      <Registration />

      <Login />

      <Link href='/' passHref>
        <h1 className='italic text-3xl cursor-pointer'>mH</h1>
      </Link>

      <div className='flex flex-row items-center'>
        {user?.data.id ? (
          <PopoverWindow
            content={
              <div className='flex flex-col items-center justify-center w-24'>
                <div
                  onClick={onLogout}
                  className='hover:bg-black-100 cursor-pointer w-full flex items-center justify-center rounded-md h-8'
                >
                  <span>Logout</span>
                </div>
              </div>
            }
            placement='bottom'
          >
            <div className='cursor-pointer rounded-md w-6 h-6 flex items-center justify-center'>
              <PersonIcon className='w-6 h-6' fill='white' />
            </div>
          </PopoverWindow>
        ) : (
          <div className='md:flex flex-row items-center'>
            <Button
              className='bg-primary text-white hover:bg-black-100 px-4 py-2 rounded-md w-28'
              onClick={onLoginModalOpen}
            >
              Sign In
            </Button>

            <span className='text-white px-4 cursor-default'>|</span>

            <Button
              className='bg-primary text-white hover:bg-black-100 px-4 py-2 rounded-md w-28'
              onClick={onRegistrationModalOpen}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };

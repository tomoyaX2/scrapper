import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeLoginModalVisible,
  changeRegistrationModalVisible
} from 'src/store/auth';
import { cleanUser } from 'src/store/user';
import { Button } from 'src/components/common/button';
import { Login } from 'src/components/layout/header/login/login.component';
import { PopoverWindow } from 'src/components/common/menu';
import { Registration } from 'src/components/layout/header/registration/registration.component';
import { ForgotPassword } from './forgotPassword/forgotPassword.component';
import { Avatar } from 'rsuite';

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
    <header className='bg-primary flex items-center justify-between md:px-16 sm:px-2 xsm:px-2 py-4'>
      <Registration />

      <Login />

      <ForgotPassword />

      <div className='flex flex-row'>
        <Link href='/' passHref>
          <h1 className='italic text-xl cursor-pointer p-2'>Home</h1>
        </Link>
      </div>

      <div className='flex flex-row items-center'>
        {user?.data.id ? (
          <PopoverWindow
            content={
              <div className='flex flex-col items-center justify-center w-24'>
                <Link href='/favourites' passHref>
                  <div className='hover:bg-black-100 cursor-pointer w-full flex items-center justify-center rounded-md h-8'>
                    <span>Favourites</span>
                  </div>
                </Link>

                <Link href='/recently-viewed' passHref>
                  <div className='hover:bg-black-100 cursor-pointer w-full flex items-center justify-center rounded-md h-8'>
                    <span>Viewed</span>
                  </div>
                </Link>

                <Link href='/account' passHref>
                  <div className='cursor-pointer hover:bg-black-100 w-full flex items-center justify-center rounded-md h-8'>
                    <span>Account</span>
                  </div>
                </Link>

                {user.data.isAdmin && (
                  <Link href='/users' passHref>
                    <div className='cursor-pointer w-full hover:bg-black-100 flex items-center justify-center rounded-md h-8'>
                      <span>Users</span>
                    </div>
                  </Link>
                )}

                <div
                  onClick={onLogout}
                  className='hover:bg-black-100 cursor-pointer  w-full flex items-center justify-center rounded-md h-8'
                >
                  <span>Logout</span>
                </div>
              </div>
            }
            placement='bottom'
          >
            <div className='cursor-pointer rounded-md flex items-center justify-center'>
              <span>{user.data.name}</span>
              <Avatar src={user.data?.avatarUrl} className='ml-4' />
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

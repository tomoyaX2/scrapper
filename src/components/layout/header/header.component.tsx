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
import { PopoverWindow } from 'src/components/common/menu';
import { Registration } from 'src/components/layout/header/registration/registration.component';
import { ForgotPassword } from './forgotPassword/forgotPassword.component';

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

        <PopoverWindow
          placement='bottom'
          trigger='click'
          content={
            <div className='flex flex-col'>
              <Link href='/?tags=8afdecf9-0a1d-4c00-85cd-362b34796a9b' passHref>
                <h1 className='italic text-lg cursor-pointer p-2 hover:bg-black-100 rounded-md'>
                  Loli
                </h1>
              </Link>

              <Link href='/?tags=49c503aa-cb75-40cc-82cc-8e7e478da9ce' passHref>
                <h1 className='italic text-lg cursor-pointer p-2 hover:bg-black-100 rounded-md'>
                  Netorare
                </h1>
              </Link>

              <Link href='/?tags=5f9a9d88-d7bb-4910-b4c6-9fc1993cb4c5' passHref>
                <h1 className='italic text-lg cursor-pointer p-2 hover:bg-black-100 rounded-md'>
                  Milf
                </h1>
              </Link>

              <Link href='/?tags=ba38df58-fca9-446e-8098-773cdb37fc7b' passHref>
                <h1 className='italic text-lg cursor-pointer p-2 hover:bg-black-100 rounded-md'>
                  Shota
                </h1>
              </Link>

              <Link href='/?tags=002bcbc2-a1ed-4cd2-afbd-a10de8c9e391' passHref>
                <h1 className='italic text-lg cursor-pointer p-2 hover:bg-black-100 rounded-md'>
                  Rape
                </h1>
              </Link>

              <Link href='/?tags=3d0a1bd6-f9b1-439a-91ac-24529e6655ae' passHref>
                <h1 className='italic text-lg cursor-pointer p-2 hover:bg-black-100 rounded-md'>
                  Yaoi
                </h1>
              </Link>
            </div>
          }
        >
          <h1 className='italic text-xl cursor-pointer ml-16 hover:bg-black-100 py-2 rounded-lg px-4'>
            Popular
          </h1>
        </PopoverWindow>
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

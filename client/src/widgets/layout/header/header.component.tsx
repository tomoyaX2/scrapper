import { Button } from '@shared/ui/atoms/button';
import { Logo } from '@shared/ui/atoms/icons/logo';
import { Menu } from '@shared/ui/atoms/icons/menu';
import { Search } from '@shared/ui/atoms/icons/search';
import { Input } from '@shared/ui/atoms/input/input';

const Header = (): JSX.Element => (
  <header className='bg-primary flex items-center justify-between px-10 py-4'>
    <Logo fill='white' className='cursor-pointer' />

    <div className='flex flex-row items-center'>
      <Input
        name='search'
        label='Quick search by name'
        containerClassName='w-64 mb-3'
        placeholder=' '
        icon={<Search className='mt-2' />}
      />

      <div className='md:flex flex-row items-center sm:hidden xsm:hidden'>
        <Button className='bg-primary text-white hover:bg-black-100 px-4 py-2 rounded-md w-28'>
          Sign In
        </Button>

        <span className='text-white px-4 cursor-default'>|</span>

        <Button className='bg-primary text-white hover:bg-black-100 px-4 py-2 rounded-md w-28'>
          Sign Up
        </Button>
      </div>

      <Menu className='md:hidden sm:block xsm:block cursor-pointer' />

      <div className='h-screen w-screen fixed md:hidden sm:flex xsm:flex flex-col bg-black-400 opacity-40 top-0 right-0 z-50' />

      <div className='h-screen absolute md:hidden sm:flex xsm:flex flex-col w-64 bg-black-400 top-0 right-0 z-50'>
        <div className='flex flex-row items-center pt-4 px-2 justify-center'>
          <Button className='bg-black-400 text-white hover:bg-black-100 px-4 py-2 rounded-md'>
            Sign In
          </Button>

          <Button className='bg-black-400 text-white hover:bg-black-100 px-4 py-2 rounded-md'>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  </header>
);

export { Header };

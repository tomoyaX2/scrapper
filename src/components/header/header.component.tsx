import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from 'src/components/icons/search';
import { useAppDispatch } from 'src/store';
import { getAlbums, changeSearchState } from 'src/store/albums';
import { Input } from '../input/input';

let inputTimeout = setTimeout(() => {}, 0);

const Header = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSearchChange = (e: { target: { value: string } }) => {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.target.value) {
        dispatch(getAlbums({ title: e.target.value, page: 1, perPage: 50 }));
      } else {
        dispatch(getAlbums({ page: 1, perPage: 20 }));
      }
      dispatch(
        changeSearchState({ page: 1, perPage: 20, shouldResetPage: false })
      );
      router.push(`/?page=1`);
    }, 800);
  };

  return (
    <header className='bg-primary flex items-center justify-between md:px-10 sm:px-2 xsm:px-2 py-4'>
      <Link href='/' passHref>
        <h1 className='italic text-3xl cursor-pointer'>mH</h1>
      </Link>

      <div className='flex flex-row items-center'>
        <Input
          name='search'
          label='Quick search by name'
          containerClassName='w-64 mb-3 md:mr-12 sm:mr-4 xsm:mr-4'
          onChange={onSearchChange}
          placeholder=' '
          icon={<Search className='mt-2' />}
        />

        {/* <div className='md:flex flex-row items-center sm:hidden xsm:hidden'>
        <Button className='bg-primary text-white hover:bg-black-100 px-4 py-2 rounded-md w-28'>
          Sign In
        </Button>

        <span className='text-white px-4 cursor-default'>|</span>

        <Button className='bg-primary text-white hover:bg-black-100 px-4 py-2 rounded-md w-28'>
          Sign Up
        </Button>
      </div> */}

        {/* <Menu className='md:hidden sm:block xsm:block cursor-pointer' /> */}

        {/* <div className='h-screen w-screen fixed md:hidden sm:flex xsm:flex flex-col bg-black-400 opacity-40 top-0 right-0 z-50' />

      <div className='h-screen fixed md:hidden sm:flex xsm:flex flex-col w-64 bg-black-400 top-0 right-0 z-50'>
        <div className='flex flex-row items-center pt-4 px-2 justify-center'>
          <Button className='bg-black-400 text-white hover:bg-black-100 px-4 py-2 rounded-md'>
            Sign In
          </Button>

          <Button className='bg-black-400 text-white hover:bg-black-100 px-4 py-2 rounded-md'>
            Sign Up
          </Button>
        </div>
      </div> */}
      </div>
    </header>
  );
};

export { Header };

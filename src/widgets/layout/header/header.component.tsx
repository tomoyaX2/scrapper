import { useRouter } from 'next/router';
import { changeSearchStateFx, searchAlbumsFx } from '@entities/album';
import { createView } from '@shared/lib/view';
import { Logo } from '@shared/ui/atoms/icons/logo';
import { Search } from '@shared/ui/atoms/icons/search';
import { Input } from '@shared/ui/atoms/input/input';

const props = {
  handleSearch: searchAlbumsFx,
  setSearch: changeSearchStateFx
};

let inputTimeout = setTimeout(() => {}, 0);

const Header = createView()
  .props(props)
  .view(({ handleSearch, setSearch }) => {
    const router = useRouter();

    const onSearchChange = (e: { target: { value: string } }) => {
      clearTimeout(inputTimeout);
      inputTimeout = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (e.target.value) {
          handleSearch({ title: e.target.value, page: 1, perPage: 50 });
        } else {
          handleSearch({ page: 1, perPage: 20 });
        }
        setSearch({ page: 1, perPage: 20 });
        router.replace(`/?page=1`);
      }, 800);
    };

    return (
      <header className='bg-primary flex items-center justify-between md:px-10 sm:px-2 xsm:px-2 py-4'>
        <Logo fill='white' className='cursor-pointer' />

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
  });

export { Header };

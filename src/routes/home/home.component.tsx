/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import { Loader } from 'rsuite';
import { PageList } from '@features/pagination/ui';
import { SearchBar } from '@features/search-bar';
import { $albumsState } from '@entities/album';
import { Album } from '@entities/album/ui';
import { createView } from '@shared/lib/view';
import { homePage } from './home.model';

const props = {
  albumsState: $albumsState
};

const Home = createView()
  .props(props)
  .enter(homePage.enter)
  .view(({ albumsState: { data, isLoading } }) => {
    const router = useRouter();

    if (router.isReady) {
      return (
        <div className='flex flex-col'>
          <SearchBar />

          {isLoading ? (
            <div className='fixed top-loader left-2/4'>
              <Loader size='md' />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
                {data.map(
                  album =>
                    (album?.preview || album.images?.length) && (
                      <Album album={album} key={album.id} />
                    )
                )}
              </div>

              {data.length ? <PageList /> : null}
            </div>
          )}
        </div>
      );
    }

    return <div />;
  });

export { Home };

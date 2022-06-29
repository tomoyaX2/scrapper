/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import { Loader } from 'rsuite';
import { PageList } from '@features/pagination/ui';
import { SearchBar } from '@features/search-bar';
import { $albumsState, resetAlbumStateFx } from '@entities/album';
import { Album } from '@entities/album/ui';
import { createView } from '@shared/lib/view';
import { homePage } from './home.model';

const props = {
  albumsState: $albumsState,
  onResetAlbumState: resetAlbumStateFx
};

const Home = createView()
  .props(props)
  .enter(homePage.enter)
  .view(({ albumsState: { data, isLoading }, onResetAlbumState }) => {
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
                {data.map(album => (
                  <Album
                    album={album}
                    key={album.id}
                    onResetAlbumState={onResetAlbumState}
                  />
                ))}
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

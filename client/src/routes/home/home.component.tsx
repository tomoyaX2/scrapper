import { PageList } from '@features/pagination/ui';
import { SearchBar } from '@features/search-bar';
import { $albumsState, fetchAlbumsFx } from '@entities/album';
import { Album } from '@entities/album/ui';
import { createView } from '@shared/lib/view';
import { homePage } from './home.model';

const props = {
  albumsState: $albumsState,
  fetchAlbums: fetchAlbumsFx
};

const Home = createView()
  .props(props)
  .enter(homePage.enter)
  .view(({ albumsState: { data } }) => (
    <div className='flex flex-col'>
      <SearchBar />

      <div className='flex flex-col items-center justify-center w-full'>
        <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
          {data.map(
            album => album?.preview && <Album album={album} key={album.id} />
          )}
        </div>

        <PageList />
      </div>
    </div>
  ));

export { Home };

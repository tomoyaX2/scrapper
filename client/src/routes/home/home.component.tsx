import Image from 'next/image';
import { PageList } from '@features/pagination/ui';
import { $albums, fetchAlbumsFx } from '@entities/album';
import { createView } from '@shared/lib/view';
import { homePage } from './home.model';

const props = {
  albums: $albums,
  fetchAlbums: fetchAlbumsFx
};

const Home = createView()
  .props(props)
  .enter(homePage.enter)
  .view(({ albums: { data } }) => (
    <div className='flex flex-col items-center justify-center w-full'>
      <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
        {console.log(data, 'data')}

        {data.map(album => (
          <div
            className='m-4 flex flex-col items-center bg-primary cursor-pointer w-80'
            key={album.id}
          >
            <Image
              src={album.images[0].url}
              loader={({ src, width }) => `${src}?w=${width}`}
              alt='preview'
              width={300}
              height={300}
            />

            <span className='text-sm text-title text-center py-1 px-1'>
              {`[${album.language}] ${album.title}`}
            </span>
          </div>
        ))}
      </div>

      <PageList />
    </div>
  ));

export { Home };

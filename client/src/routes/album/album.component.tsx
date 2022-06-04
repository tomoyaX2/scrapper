import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Tag, Button } from 'rsuite';
import { $albumPage, fetchAlbumFx, downloadAlbumFx } from '@entities/album';
import { createView } from '@shared/lib/view';
import { Download } from '@shared/ui/atoms/icons/download-icon';

const props = {
  album: $albumPage,
  fetchAlbum: fetchAlbumFx,
  downloadAlbum: downloadAlbumFx
};

const useEffects = props => {
  const router = useRouter();
  useEffect(() => {
    router.query.id && props.fetchAlbum(router.query.id);
  }, [router.query.id]);
};

const Album = createView()
  .props(props)
  .effect(useEffects)
  .view(
    ({ album }) =>
      album && (
        <div className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-row px-12 py-4 bg-secondary'>
            <Image
              src={`http://localhost:8080/${album.images[0]?.url}`}
              loader={({ src, width }) => `${src}?w=${width}`}
              alt='preview'
              width={400}
              height={350}
            />

            <div className='flex flex-col items-center px-12'>
              <span className='text-lg'>{album.name}</span>

              {album.language?.name && (
                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Language:</span>

                  <span className='text-sm capitalize'>
                    {album.language.name}
                  </span>
                </div>
              )}

              {album.type?.name && (
                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Type:</span>

                  <span className='text-sm capitalize'>{album.type.name}</span>
                </div>
              )}

              {album.tags?.length && (
                <div className='flex flex-row items-center justify-start w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Tags:</span>

                  <div className='flex items-center flex-wrap'>
                    {album.tags.map(el => (
                      <Link href={`/?tagIds=${el.id}`} passHref key={el.id}>
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1'>
                          {el.name}
                        </Tag>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {album.authors?.length && (
                <div className='flex flex-row items-center justify-start w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Authors:</span>

                  <div className='flex items-center flex-wrap'>
                    {album.authors.map(el => (
                      <Link href={`/?tagIds=${el.id}`} passHref key={el.id}>
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize'>
                          {el.name}
                        </Tag>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {album.series?.length && (
                <div className='flex flex-row items-center justify-start w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Series:</span>

                  <div className='flex items-center flex-wrap'>
                    {album.series.map(el => (
                      <Link href={`/?tagIds=${el.id}`} passHref key={el.id}>
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover'>
                          {el.name}
                        </Tag>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {album.group?.name && (
                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Group:</span>

                  <span className='text-sm capitalize'>
                    {album.group?.name}
                  </span>
                </div>
              )}

              <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                <span className='text-sm mr-4 w-20'>Pages:</span>

                <span className='text-sm'>{album.images.length}</span>
              </div>

              <div className='w-full flex items-center justify-start mt-4'>
                <Button
                  className='flex items-center px-2 -ml-2'
                  onClick={() => props.downloadAlbum(album)}
                >
                  <Download fill='white' className='mr-2' />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
  );

export { Album };

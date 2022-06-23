import type { Effect } from 'effector';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Tag, Button } from 'rsuite';
import {
  $albumPage,
  fetchAlbumFx,
  downloadAlbumFx,
  changeSearchStateFx
} from '@entities/album';
import type { Search, Album as AlbumEntity } from '@entities/album';
import { createView } from '@shared/lib/view';
import { Download } from '@shared/ui/atoms/icons/download-icon';

const props = {
  album: $albumPage,
  fetchAlbum: fetchAlbumFx,
  downloadAlbum: downloadAlbumFx,
  setSearch: changeSearchStateFx
};

const useEffects = (props: { fetchAlbum: Effect<string, AlbumEntity> }) => {
  const router = useRouter();
  useEffect(() => {
    router.query.id && props.fetchAlbum(router.query.id as string);
  }, [router.query.id]);
};

const Album = createView()
  .props(props)
  .effect(useEffects)
  .view(({ album, setSearch }) => {
    const router = useRouter();

    const onRedirect = (ids: string | string[], key: keyof Search) => () => {
      const targetString = Array.isArray(ids) ? ids.join(',') : ids;
      setSearch({ [key]: [ids], page: 1, perPage: 20 });
      router.replace(`/?page=1&${key}=${targetString}`);
    };

    const onDownloadAlbum = () => {
      album && props.downloadAlbum(album);
    };

    return (
      album && (
        <div className='flex flex-col items-center justify-start w-full'>
          <div className='flex md:flex-row sm:flex-col xsm:flex-col sm:px-4 xsm:px-4 lg:px-24 md:px-4 py-4 bg-secondary lg:max-w-gallery md:max-w-unset sm:max-w-unset xs:max-w-unset md:w-full sm:w-full xsm:w-full'>
            <div className='flex items-center justify-center lg:w-84 md:w-full sm:w-full xsm:w-full h-100'>
              <Image
                src={album.images[0]?.url}
                loader={({ src, width }) => `${src}?w=${width}`}
                alt='preview'
                width={350}
                height={400}
              />
            </div>

            <div className='flex flex-col items-start justify-between sm:px-1 xsm:px-1 lg:pl-32 ms:px-4 xsm:ml-4 sm:ml-4 lg:ml-0 lg:mt-0 md:mt-2 sm:mt-4 xsm:mt-4'>
              <div>
                <span className='text-lg'>{album.name}</span>

                {album.language?.name ? (
                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Language:</span>

                    <Tag
                      className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'
                      onClick={onRedirect(album.language.id, 'languages')}
                    >
                      {album.language.name}
                    </Tag>
                  </div>
                ) : null}

                {album.type?.name ? (
                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Type:</span>

                    <Tag
                      className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'
                      onClick={onRedirect(album.type.id, 'types')}
                    >
                      {album.type.name}
                    </Tag>
                  </div>
                ) : null}

                {album.tags?.length ? (
                  <div className='flex flex-row items-center justify-start w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Tags:</span>

                    <div className='flex items-center flex-wrap max-w-tags'>
                      {album.tags.map(el => (
                        <Tag
                          className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'
                          onClick={onRedirect(el.id, 'tags')}
                          key={el.id}
                        >
                          {el.name}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ) : null}

                {album.authors?.length ? (
                  <div className='flex flex-row items-center justify-start w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Authors:</span>

                    <div className='flex items-center flex-wrap'>
                      {album.authors.map(el => (
                        <Tag
                          className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize rs-theme-dark'
                          key={el.id}
                          onClick={onRedirect(el.id, 'authors')}
                        >
                          {el.name}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ) : null}

                {album.series?.length ? (
                  <div className='flex flex-row items-center justify-start w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Series:</span>

                    <div className='flex items-center flex-wrap'>
                      {album.series.map(el => (
                        <Tag
                          className='cursor-pointer mr-1 bg-third hover:bg-third-hover rs-theme-dark'
                          onClick={onRedirect(el.id, 'series')}
                          key={el.id}
                        >
                          {el.name}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ) : null}

                {album.group?.name ? (
                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4 rs-theme-dark'>
                    <span className='text-sm mr-4 w-20'>Group:</span>

                    <Tag
                      className='cursor-pointer mr-1 bg-third hover:bg-third-hover rs-theme-dark'
                      onClick={onRedirect(album.group.id, 'groups')}
                    >
                      {album.group?.name}
                    </Tag>
                  </div>
                ) : null}

                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Pages:</span>

                  <span className='text-sm'>{album.images.length}</span>
                </div>
              </div>

              <div className='w-full flex items-center justify-start mt-4 mb-2'>
                <Button
                  className='flex items-center px-2 -ml-2 rs-theme-dark'
                  onClick={onDownloadAlbum}
                >
                  <Download fill='white' className='mr-2' />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-row flex-wrap items-center max-w-gallery justify-center bg-secondary mt-4'>
            {album.images.map(el =>
              el ? (
                <Link
                  href={`/album/${album.id}/reader/${el.id}`}
                  passHref
                  key={el.id}
                >
                  <div className='px-4 py-2 cursor-pointer'>
                    <Image
                      src={el?.url}
                      loader={({ src, width }) => `${src}?w=${width}`}
                      alt={`image-${el.id}`}
                      width={200}
                      height={250}
                      key={el.id}
                      className='px-4 py-2'
                    />
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      )
    );
  });

export { Album };

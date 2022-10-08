import { DefaultSeo as Seo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Tag, Button } from 'rsuite';
import { TITLE_SEO } from '@shared/config/seo';
import { Download } from 'src/components/common/icons/download-icon';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  deleteAlbum,
  downloadAlbum,
  getAlbum,
  getAlbumImages
} from 'src/store/album';
import { Image } from 'src/components/common/image';
import ReactGA from 'react-ga4';
import { TrashIcon } from 'src/components/common/icons/trash';
import { getUser } from 'src/store/user';

const Album = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const album = useAppSelector(state => state.album);
  const { data: user } = useAppSelector(state => state.user);

  useEffect(() => {
    router.query.id && dispatch(getAlbum(router));
    dispatch(getUser());
    router.query.id &&
      dispatch(
        getAlbumImages({
          albumId: router.query.id as string,
          page: 1,
          redirectOnError: async () => router.push('/')
        })
      );
    ReactGA.send({ hitType: 'pageview', page: window.location.href });
  }, [router.query.id]);

  const onDownloadAlbum = () => {
    album && downloadAlbum(album);
  };

  const onDeleteAlbum = () => {
    dispatch(deleteAlbum(album.id));
    router.push('/');
  };

  return album?.id ? (
    <>
      <Seo
        {...TITLE_SEO({
          title: `${
            album?.authors?.length
              ? `[${album.authors.map(el => el.name).join(',')}] | `
              : ''
          }${album?.title}`,
          language: album?.language?.name ?? ''
        })}
        canonical={window.location.href}
      />

      {!!album.images.length && (
        <div className='flex flex-col items-center justify-start w-full'>
          <div className='flex md:flex-row sm:flex-col xsm:flex-col sm:px-4 xsm:px-4 lg:px-24 md:px-4 py-4 bg-secondary lg:max-w-gallery md:max-w-unset sm:max-w-unset xs:max-w-unset md:w-full sm:w-full xsm:w-full'>
            <div className='flex items-center justify-center lg:w-112 md:w-full sm:w-full xsm:w-full h-100'>
              <Image
                url={album.images[0]?.url}
                width={album.images[0]?.width}
                height={album.images[0]?.height}
                alt='preview'
                horizontalSizes={{ height: 400, width: 600 }}
                verticalSizes={{ height: 400, width: 320 }}
              />
            </div>

            <div className='flex flex-col items-start justify-between sm:px-1 xsm:px-1 lg:pl-32 ms:px-4 xsm:ml-4 sm:ml-4 lg:ml-0 lg:mt-0 md:mt-2 sm:mt-4 xsm:mt-4'>
              <div>
                <h1 className='text-lg'>{album.title}</h1>

                {album.language?.name ? (
                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Language:</span>

                    <Link
                      href={`/?page=1&languages=${album.language.id}`}
                      passHref
                    >
                      <a target='_blank'>
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                          {album.language.name}
                        </Tag>
                      </a>
                    </Link>
                  </div>
                ) : null}

                {album.type?.name ? (
                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Type:</span>

                    <Link href={`/?page=1&types=${album.type.id}`} passHref>
                      <a target='_blank'>
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                          {album.type.name}
                        </Tag>
                      </a>
                    </Link>
                  </div>
                ) : null}

                {album.tags?.length ? (
                  <div className='flex flex-row items-center justify-start w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Tags:</span>

                    <div className='flex items-center flex-wrap max-w-tags'>
                      {album.tags.map(el => (
                        <Link
                          href={`/?page=1&tags=${el.id}`}
                          passHref
                          key={el.id}
                        >
                          <a target='_blank'>
                            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                              {el.name}
                            </Tag>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {album.authors?.length ? (
                  <div className='flex flex-row items-center justify-start w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Authors:</span>

                    <div className='flex items-center flex-wrap'>
                      {album.authors.map(el => (
                        <Link
                          href={`/?page=1&authors=${el.id}`}
                          passHref
                          key={el.id}
                        >
                          <a target='_blank'>
                            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                              {el.name}
                            </Tag>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {album.series?.length ? (
                  <div className='flex flex-row items-center justify-start w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Series:</span>

                    <div className='flex items-center flex-wrap'>
                      {album.series.map(el => (
                        <Link
                          href={`/?page=1&series=${el.id}`}
                          passHref
                          key={el.id}
                        >
                          <a target='_blank'>
                            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                              {el.name}
                            </Tag>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {album.group?.name ? (
                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4 '>
                    <span className='text-sm mr-4 w-20'>Group:</span>

                    <Link href={`/?page=1&types=${album.group.id}`} passHref>
                      <a target='_blank'>
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover '>
                          {album.group?.name}
                        </Tag>
                      </a>
                    </Link>
                  </div>
                ) : null}

                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Pages:</span>

                  <span className='text-sm'>{album.images.length}</span>
                </div>
              </div>

              <div className='w-full flex items-center justify-start mt-4 mb-2'>
                <Button
                  className='flex items-center px-2 -ml-2 '
                  onClick={onDownloadAlbum}
                >
                  <Download fill='white' className='mr-2' />
                  Download
                </Button>

                {user.isAdmin && (
                  <Button
                    className='flex items-center px-2'
                    onClick={onDeleteAlbum}
                  >
                    <TrashIcon className='w-6 h-6' fill='white' />
                    Remove
                  </Button>
                )}
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
                      url={el?.url}
                      width={el.width}
                      height={el.height}
                      alt={`image-${el.id}`}
                      horizontalSizes={{ height: 200, width: 450 }}
                      verticalSizes={{ height: 300, width: 200 }}
                      className='px-4 py-2'
                    />
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      )}
    </>
  ) : (
    <div />
  );
};

export { Album };

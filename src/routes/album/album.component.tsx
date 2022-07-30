import { DefaultSeo as Seo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Tag, Button } from 'rsuite';
import { TITLE_SEO } from '@shared/config/seo';
import { Download } from 'src/components/icons/download-icon';
import { useAppDispatch, useAppSelector } from 'src/store';
import { downloadAlbum, getAlbum } from 'src/store/album';

const Album = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const album = useAppSelector(state => state.album);

  useEffect(() => {
    router.query.id && dispatch(getAlbum(router.query.id as string));
  }, [router.query.id]);

  const onDownloadAlbum = () => {
    album && downloadAlbum(album);
  };

  return album?.id ? (
    <>
      <Seo
        {...TITLE_SEO({
          title: album?.title,
          language: album?.language?.name ?? ''
        })}
      />

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
              <span className='text-lg'>{album.title}</span>

              {album.language?.name ? (
                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                  <span className='text-sm mr-4 w-20'>Language:</span>

                  <Link
                    href={`/?page=1&languages=${album.language.id}`}
                    passHref
                  >
                    <a target='_blank'>
                      <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'>
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
                      <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'>
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
                          <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'>
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
                          <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'>
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
                          <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 rs-theme-dark'>
                            {el.name}
                          </Tag>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {album.group?.name ? (
                <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4 rs-theme-dark'>
                  <span className='text-sm mr-4 w-20'>Group:</span>

                  <Link href={`/?page=1&types=${album.group.id}`} passHref>
                    <a target='_blank'>
                      <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover rs-theme-dark'>
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
    </>
  ) : (
    <div />
  );
};

export { Album };

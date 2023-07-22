import { DefaultSeo as Seo } from 'next-seo';
import { Rate } from 'rsuite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tag, Button } from 'rsuite';
import { TITLE_SEO } from '@shared/config/seo';
import { Download } from 'src/components/common/icons/download-icon';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  deleteAlbum,
  downloadAlbum,
  getAlbumImages,
  rateAlbum,
  getAlbumRate,
  getRecommentdations
} from 'src/store/album';
import { Image } from 'src/components/common/image';
import ReactGA from 'react-ga4';
import { TrashIcon } from 'src/components/common/icons/trash';
import { getUser } from 'src/store/user';
import {
  addToGallery,
  getGalleries,
  removeFromGallery
} from 'src/store/galleries';
import { HeartIcon } from 'src/components/common/icons/heart';
import { PopoverWindow } from 'src/components/common/menu';
import { Checkbox } from 'rsuite';
import { AlbumState } from 'src/store/album/types';
import {
  defaultSuccessMessage,
  showNotification
} from 'src/store/notifications';
import { StarIcon } from 'src/components/common/icons/star';
import { TagsList } from 'src/components/common/tagsList';
import { Comments } from './comments';
import { Recommendations } from './recommendations';
import { ScrollToUpArrow } from 'src/components/common/scrollArrow';
import { ShowAlbumImages } from 'src/components/common/showAlbumImages';
import { Redactor } from 'src/components/common/icons/redactor';

const Album = ({
  initialData: album
}: {
  initialData: AlbumState;
}): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const albumImages = useAppSelector(state => state.album.images);
  const currentRate = useAppSelector(state => state.album.currentRate);
  const { data: user } = useAppSelector(state => state.user);
  const { favourites, recentlyViewed } = useAppSelector(
    state => state.galleries
  );
  const freshRate = useAppSelector(state => state.album.rate);
  const recommendations = useAppSelector(state => state.album.recommendations);
  const [redactorMode, setRedactorMode] = useState(false);
  const [includedIntoGalleries, setIncludedIntoGalleries] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (!album?.id) {
      router.push('/');
    }
  }, [album?.id]);

  useEffect(() => {
    if (album?.id) {
      dispatch(
        getAlbumImages({
          albumId: router.query.id as string,
          page: 1
        })
      );
      dispatch(getUser());
      dispatch(getGalleries());
      dispatch(getRecommentdations({ albumId: album.id }));
      dispatch(getAlbumRate({ albumId: album.id }));
      ReactGA.send({ hitType: 'pageview', page: window.location.href });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (user?.id && recentlyViewed?.id) {
      dispatch(
        addToGallery({ galleryId: recentlyViewed.id, albumId: album?.id })
      );
    }
  }, [user?.id, recentlyViewed?.id]);

  useEffect(() => {
    const result = [];
    if (favourites?.albums) {
      for (const galleryItem of favourites.albums) {
        if (favourites.albums.some(el => el.id === album?.id)) {
          result.push(galleryItem.id);
        }
      }
      setIncludedIntoGalleries(result);
    }
  }, [favourites?.albums, album?.id]);

  const onDownloadAlbum = () => {
    album && downloadAlbum(album);
  };

  const handleChangeRedactorMode = () => {
    setRedactorMode(!redactorMode);
  };

  const onDeleteAlbum = () => {
    dispatch(deleteAlbum(album?.id));
    router.push('/');
  };

  const onRateAlbum = (rate: number) => {
    dispatch(rateAlbum({ albumId: album?.id, rate }));
  };

  const onChangeAlbumGalleryStatus = (galleryId: string) => {
    const exists = includedIntoGalleries.includes(galleryId);
    if (exists) {
      setIncludedIntoGalleries(
        includedIntoGalleries.filter(id => id !== galleryId)
      );
      dispatch(removeFromGallery({ galleryId, albumId: album?.id }));
    } else {
      setIncludedIntoGalleries([...includedIntoGalleries, galleryId]);
      void dispatch(
        addToGallery({ albumId: album?.id, galleryId: favourites?.id ?? '' })
      );
    }
    dispatch(showNotification(defaultSuccessMessage));
  };

  const targetRate = freshRate ? freshRate : album?.rate;

  return (
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

      {!!albumImages?.length && (
        <div className='flex flex-row w-full justify-center'>
          <div className='flex flex-col'>
            {!!recommendations?.sameAuthor?.length && (
              <Recommendations
                items={recommendations.sameAuthor}
                label='Same author'
              />
            )}
            {!!recommendations?.sameGroups?.length && (
              <Recommendations
                items={recommendations.sameGroups}
                label='Same groups'
              />
            )}
            {!!recommendations?.sameSeries?.length && (
              <Recommendations
                items={recommendations.sameSeries}
                label='Same series'
              />
            )}
          </div>
          <div className='flex flex-col items-center justify-start'>
            <div className='flex md:flex-row sm:flex-col xsm:flex-col sm:px-4 xsm:px-4 lg:px-24 md:px-4 py-4 bg-secondary lg:max-w-gallery md:max-w-unset sm:max-w-unset xs:max-w-unset md:w-full sm:w-full xsm:w-full'>
              <div className='flex items-center justify-center lg:w-112 md:w-full sm:w-full xsm:w-full h-100'>
                <Image
                  url={albumImages[0]?.url}
                  width={albumImages[0]?.width}
                  height={albumImages[0]?.height}
                  alt='preview'
                  horizontalSizes={{ height: 400, width: 600 }}
                  verticalSizes={{ height: 320, width: 280 }}
                />
              </div>

              <div className='flex flex-col items-start justify-between sm:px-1 xsm:px-1 lg:pl-32 ms:px-4 xsm:ml-4 sm:ml-4 lg:ml-0 lg:mt-0 md:mt-2 sm:mt-4 xsm:mt-4'>
                <div>
                  {user.isAdmin && (
                    <Button
                      className='float-right'
                      onClick={handleChangeRedactorMode}
                    >
                      <Redactor fill='white' />
                    </Button>
                  )}
                  <div className='flex flex-col'>
                    {/* {redactorMode ? (
                      <Input value={album.title} onChange={}/>
                    ) : (
                      <h1 className='text-lg flex flex-row'>{album.title}</h1>
                    )} */}
                    <h1 className='text-lg flex flex-row'>{album.title}</h1>
                    <div className='flex flex-row items-center justify-start w-12'>
                      <span>{targetRate?.toFixed(1)}</span>

                      <StarIcon className='w-5 h-5 ml-2' fill='white' />
                    </div>
                  </div>
                  {album.language?.name ? (
                    <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                      <span className='text-sm mr-4 w-20'>Language:</span>

                      <Link
                        href={`/?page=1&languages=${album.language.id}`}
                        passHref
                        target='_blank'
                      >
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                          {album.language.name}
                        </Tag>
                      </Link>
                    </div>
                  ) : null}

                  {album.type?.name ? (
                    <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                      <span className='text-sm mr-4 w-20'>Type:</span>

                      <Link
                        href={`/?page=1&types=${album.type.id}`}
                        passHref
                        target='_blank'
                      >
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                          {album.type.name}
                        </Tag>
                      </Link>
                    </div>
                  ) : null}

                  {album.tags?.length ? (
                    <div className='flex flex-row items-center justify-start w-full mt-4'>
                      <span className='text-sm mr-4 w-20'>Tags:</span>

                      <TagsList items={album.tags} />
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
                            target='_blank'
                          >
                            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                              {el.name}
                            </Tag>
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
                            target='_blank'
                          >
                            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                              {el.name}
                            </Tag>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {album.group?.name ? (
                    <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4 '>
                      <span className='text-sm mr-4 w-20'>Group:</span>

                      <Link
                        href={`/?page=1&groups=${album.group.id}`}
                        passHref
                        target='_blank'
                      >
                        <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover '>
                          {album.group?.name}
                        </Tag>
                      </Link>
                    </div>
                  ) : null}

                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Pages:</span>

                    <span className='text-sm'>{albumImages.length}</span>
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
                      <TrashIcon className='w-6 h-6 mt-1' fill='white' />
                      Remove
                    </Button>
                  )}

                  {user.id ? (
                    <PopoverWindow
                      placement='right'
                      trigger='click'
                      content={
                        <div className='flex flex-col items-center justify-center'>
                          {[favourites].map(el => (
                            <Checkbox
                              key={el.id}
                              checked={includedIntoGalleries.includes(el.id)}
                              onChange={() => onChangeAlbumGalleryStatus(el.id)}
                            >
                              {el.name}
                            </Checkbox>
                          ))}
                        </div>
                      }
                    >
                      <Button className='flex items-center px-2'>
                        <HeartIcon className='w-5 h-5 mr-2 mt-1' fill='white' />
                        Add To -&gt;
                      </Button>
                    </PopoverWindow>
                  ) : (
                    <PopoverWindow
                      placement='top'
                      trigger='hover'
                      content={
                        <span>
                          You have to be logged it for saving this title
                        </span>
                      }
                    >
                      <Button className='flex items-center px-2'>
                        <HeartIcon className='w-5 h-5 mr-2 mt-1' fill='white' />
                        Add To Favourites
                      </Button>
                    </PopoverWindow>
                  )}
                </div>

                {user?.id ? (
                  <div className='w-full flex items-center justify-start mt-1 mb-2 flex-row'>
                    <span className='text-sm mr-4 w-20'>Rate this:</span>

                    <div className='m-3'>
                      <Rate
                        size='xs'
                        color='cyan'
                        onChange={onRateAlbum}
                        value={currentRate}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex items-center justify-start mt-1 mb-2 flex-row'>
                    <span className='text-sm mr-4 w-20'>Rate this:</span>

                    <div className='m-3'>
                      <PopoverWindow
                        placement='top'
                        trigger='hover'
                        content={
                          <span>
                            You have to be logged it for rate this title
                          </span>
                        }
                      >
                        <Rate size='xs' color='cyan' value={currentRate} />
                      </PopoverWindow>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ShowAlbumImages albumId={album.id} items={albumImages} />
            <Comments />
          </div>
          <ScrollToUpArrow />
        </div>
      )}
    </>
  );
};

export { Album };

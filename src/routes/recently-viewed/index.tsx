import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Album } from '@routes/home/album';
import { useAppDispatch, useAppSelector } from 'src/store';
import ReactGA from 'react-ga4';
import { getUser } from 'src/store/user';
import { getGalleries, setMaxAmount } from 'src/store/galleries';
import { Input } from 'rsuite';

const RecentlyViewed = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { recentlyViewed, isLoading } = useAppSelector(
    state => state.galleries
  );

  useEffect(() => {
    dispatch(
      getUser(() => {
        router.push('/');
      })
    );
    dispatch(getGalleries());
    ReactGA.send({ hitType: 'pageview' });
  }, []);

  const router = useRouter();

  const onSetMaxAmount = (galleryId: string, maxAmount: string) => {
    dispatch(setMaxAmount({ galleryId, maxAmount }));
  };

  if (router.isReady) {
    return (
      <div className='flex flex-col'>
        <div className='flex items-start justify-start mt-10 mx-20 '>
          <Input
            className='w-60'
            onChange={maxAmount => onSetMaxAmount(recentlyViewed.id, maxAmount)}
            type='number'
            placeholder='Set Albums Max Amount'
          />
        </div>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
              {new Array(25)
                .map((_, index) => ({
                  id: `${index}`,
                  preview: `${window.location.origin}/images/blur.png`,
                  path: '',
                  title: ''
                }))
                .map(album => (
                  <Album album={album} key={album.id} />
                ))}
            </div>
          </div>
        ) : !recentlyViewed?.albums?.length ? (
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
              No albums here
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
              {recentlyViewed?.albums.map(album => (
                <Album
                  album={album}
                  key={album.id}
                  galleryId={recentlyViewed.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div />;
};

export { RecentlyViewed };

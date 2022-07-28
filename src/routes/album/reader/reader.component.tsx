import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { SelectPicker, Input } from 'rsuite';
import {
  fetchAlbumFx,
  $readerPage,
  changeReaderPageFx,
  $albumPage
} from '@entities/album';
import { createView } from '@shared/lib/view';
import { Arrow } from '@shared/ui/atoms/icons/arrow';
import { switchPageTimeoutHandler } from '@shared/utils/timeoutHandler';

const props = {
  reader: $readerPage,
  fetchAlbum: fetchAlbumFx,
  onChangeReaderPage: changeReaderPageFx,
  album: $albumPage
};

let clickTimeout = setTimeout(() => {});

const onHandleTouch =
  (callback: (event: TouchEvent) => void) => (event: TouchEvent) => {
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => callback(event), 100);
  };

const useEffects = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search
    });
  }, []);
};

const Reader = createView()
  .props(props)
  .effect(useEffects)
  .view(
    ({
      reader: { currentPage, images, pagesList },
      onChangeReaderPage,
      fetchAlbum,
      album
    }) => {
      const router = useRouter();
      const [switchTimer, setSwitchTimer] = useState<number>(0);

      useEffect(() => {
        router.query.id && fetchAlbum(router.query.id as string);
      }, [router.query.id]);

      useEffect(() => {
        if (images?.length) {
          onChangeReaderPage(
            images?.findIndex(el => el.id === router.query.readerId) + 1
          );
        }
      }, [router.query.readerId, images]);

      if (!images.length) {
        return null;
      }

      const prevPage = currentPage > 1 ? currentPage - 1 : 1;
      const nextPage =
        currentPage < images.length - 1 ? currentPage + 1 : currentPage;

      const onTouchEvent = onHandleTouch(
        e =>
          e &&
          onChangeReaderPage(
            //@ts-expect-error cause of i want
            e.target?.offsetWidth / 2 < e.touches[0].clientX
              ? nextPage
              : prevPage
          )
      );

      const onClickEvent = onHandleTouch(e =>
        onChangeReaderPage(
          //@ts-expect-error cause of i want
          e.target?.offsetWidth / 2 < e.pageX ? nextPage : prevPage
        )
      );

      const onTimerValueChange = (value: string) => {
        const testReg = /^\d+$/;

        if (typeof value === 'string' && !testReg.test(value) && !!value) {
          return;
        }

        const result = parseInt(value);
        const time = !value ? 0 : result;

        switchPageTimeoutHandler({
          time,
          onChangeReaderPage,
          currentPage,
          totalPages: images.length
        });
        setSwitchTimer(time);
      };

      const isGameCG = album?.type?.name === 'game CG';

      return (
        <div className='w-full'>
          <div className='flex flex-row bg-primary w-full h-16 items-center md:ustify-center sm:justify-center xsm:justify-start'>
            <Arrow
              fill={currentPage > 1 ? 'white' : 'gray'}
              className='rotate-180 md:flex sm:hidden xsm:hidden'
              onClick={() => onChangeReaderPage(prevPage)}
            />

            <SelectPicker
              data={pagesList}
              value={currentPage}
              className='rs-theme-dark md:w-32 sm:w-20 xsm:w-24 px-4'
              menuClassName='rs-theme-dark'
              cleanable={false}
              onChange={onChangeReaderPage}
            />

            <Arrow
              fill={currentPage <= images.length - 1 ? 'white' : 'gray'}
              className='cursor-pointer md:flex sm:hidden xsm:hidden'
              onClick={() => onChangeReaderPage(nextPage)}
            />

            <span className='text-sm text-white-300 ml-2 mr-2'>
              Switch page every
            </span>

            <Input
              onChange={onTimerValueChange}
              value={switchTimer}
              className='md:w-20 sm:w-12 xsm:w-12 h-19 rs-theme-dark'
            />

            <span className='text-sm text-white-300 ml-2'>sec</span>
          </div>

          <div
            className='flex items-center justify-center cursor-pointer mt-4'
            //@ts-expect-error cause of i want
            onTouchStart={onTouchEvent}
            //@ts-expect-error cause of i want
            onClick={onClickEvent}
          >
            <Image
              src={images[currentPage - 1]?.url}
              loader={({ src, width }) => `${src}?w=${width}`}
              alt='preview'
              width={isGameCG ? 1100 : 700}
              height={900}
            />
          </div>
        </div>
      );
    }
  );

export { Reader };

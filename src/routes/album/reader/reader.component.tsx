import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { SelectPicker, Input } from 'rsuite';
import { Arrow } from 'src/components/common/icons/arrow';
import {
  switchPageTimeoutHandler,
  switchPageIndexTimeout
} from '@shared/utils/timeoutHandler';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getReaderImages } from 'src/store/reader';
import { changeReaderPage } from 'src/store/reader';
import { Image } from 'src/components/common/image';
import { NextSeo } from 'next-seo';
import { getAlbum } from 'src/store/album';
import ReactGA from 'react-ga4';

let clickTimeout = setTimeout(() => {});

const onHandleTouch =
  (callback: (event: TouchEvent) => void) => (event: TouchEvent) => {
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => callback(event), 200);
  };

const Reader = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { images, currentPage, pagesList } = useAppSelector(
    state => state.reader
  );
  const album = useAppSelector(state => state.album);
  const [switchTimer, setSwitchTimer] = useState<number>(0);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.href });

    return () => clearTimeout(switchPageIndexTimeout);
  }, []);

  useEffect(() => {
    router.query.id && dispatch(getReaderImages(router.query.id as string));
    router.query.id && dispatch(getAlbum(router));
  }, [router.query.id]);

  useEffect(() => {
    if (images?.length) {
      const cuurentIndex = images?.findIndex(
        el => el.id === router.query.readerId
      );
      if (cuurentIndex !== currentPage) {
        handleChangePage(cuurentIndex);
      }
    }
  }, [router.query.readerId, images]);

  if (!images.length) {
    return <div />;
  }

  const handleChangePage = (page: number) => {
    router.push(`/album/${album.id}/reader/${images[page]?.id}`);
    dispatch(changeReaderPage(page));
  };

  const prevPage = !!currentPage ? currentPage - 1 : 0;
  const nextPage =
    currentPage < images.length - 1 ? currentPage + 1 : currentPage;

  const onTouchEvent = onHandleTouch(
    e =>
      e &&
      handleChangePage(
        //@ts-expect-error cause of i want
        e.target?.offsetWidth / 2 < e.touches[0].clientX ? nextPage : prevPage
      )
  );

  const onClickEvent = onHandleTouch(e =>
    handleChangePage(
      //@ts-expect-error cause of i want
      e.target?.offsetWidth / 2 < e.pageX ? nextPage : prevPage
    )
  );

  const onTimerValueChange = (value: string) => {
    const testReg = /^\d+$/;
    if (typeof value === 'string' && !testReg.test(value) && !!value) {
      return;
    }
    ReactGA.send({ hitType: 'autoread_interract' });

    const result = parseInt(value);
    const time = !value ? 0 : result;

    switchPageTimeoutHandler({
      time,
      changeReaderPage: handleChangePage,
      currentPage,
      totalPages: images.length - 1
    });
    setSwitchTimer(time);
  };
  return (
    <>
      <NextSeo noindex />

      <div className='w-full'>
        <div className='flex flex-row bg-primary w-full h-16 items-center md:ustify-center sm:justify-center xsm:justify-start'>
          <Arrow
            fill={!!currentPage ? 'white' : 'gray'}
            className='rotate-180 md:flex sm:hidden xsm:hidden'
            onClick={() => handleChangePage(prevPage)}
          />

          <SelectPicker
            data={pagesList}
            value={currentPage}
            className=' md:w-32 sm:w-20 xsm:w-24 px-4'
            menuClassName=''
            cleanable={false}
            onChange={handleChangePage}
          />

          <Arrow
            fill={currentPage < images.length - 1 ? 'white' : 'gray'}
            className='cursor-pointer md:flex sm:hidden xsm:hidden'
            onClick={() => handleChangePage(nextPage)}
          />

          <span className='text-sm text-white-300 ml-2 mr-2'>
            Switch page every
          </span>

          <Input
            onChange={onTimerValueChange}
            value={switchTimer}
            className='md:w-20 sm:w-12 xsm:w-12 h-19 '
          />

          <span className='text-sm text-white-300 ml-2'>sec</span>
        </div>

        <div
          className='flex items-center justify-center cursor-pointer mt-4'
          //@ts-expect-error cause of i want
          onTouchEnd={onTouchEvent}
          //@ts-expect-error cause of i want
          onClick={onClickEvent}
        >
          <Image
            url={images[currentPage]?.url}
            width={images[currentPage]?.width}
            height={images[currentPage]?.height}
            alt='preview'
            horizontalSizes={{ height: 800, width: 1200 }}
            verticalSizes={{ height: 900, width: 800 }}
          />
        </div>
      </div>
    </>
  );
};

export { Reader };

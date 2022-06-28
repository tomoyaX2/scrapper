import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { SelectPicker, Input, Checkbox } from 'rsuite';
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

const Reader = createView()
  .props(props)
  .view(
    ({
      reader: { currentPage, images, pagesList },
      onChangeReaderPage,
      fetchAlbum,
      album
    }) => {
      const router = useRouter();
      const [switchTimer, setSwitchTimer] = useState<{
        isActive: boolean;
        value: string | number;
      }>({
        isActive: false,
        value: 3
      });

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
        const isCleanValue = value === '';
        console.log(value === '', 'value');

        if (
          typeof value === 'string' &&
          !testReg.test(value) &&
          !isCleanValue
        ) {
          return;
        }

        const result = !isCleanValue ? parseInt(value) : value;
        const resultState = isCleanValue
          ? { isActive: false, value: '' }
          : { ...switchTimer, value: result };

        switchPageTimeoutHandler({
          ...resultState,
          onChangeReaderPage,
          currentPage,
          totalPages: images.length
        });
        setSwitchTimer(resultState);
      };

      const onTimerActiveChange = () => {
        const resultState = { ...switchTimer, isActive: !switchTimer.isActive };

        switchPageTimeoutHandler({
          ...resultState,
          onChangeReaderPage,
          currentPage,
          totalPages: images.length
        });
        setSwitchTimer(resultState);
      };

      const isGameCG = album?.type?.name === 'game CG';

      return (
        <div className='w-full'>
          <div className='flex flex-row bg-primary w-full h-16 items-center justify-center'>
            <Arrow
              fill={currentPage > 1 ? 'white' : 'gray'}
              className='rotate-180 md:flex sm:hidden xsm:hidden'
              onClick={() => onChangeReaderPage(prevPage)}
            />

            <SelectPicker
              data={pagesList}
              value={currentPage}
              className='rs-theme-dark w-32 px-4'
              cleanable={false}
              onChange={onChangeReaderPage}
            />

            <Arrow
              fill={currentPage <= images.length - 1 ? 'white' : 'gray'}
              className='cursor-pointer md:flex sm:hidden xsm:hidden'
              onClick={() => onChangeReaderPage(nextPage)}
            />

            <span className='text-sm text-white-300 md:ml-8 sm:ml-2 xsm:ml-2 md:mr-2 sm:mr-0 xsm:mr-0'>
              Enable:
            </span>

            <Checkbox
              className='rs-theme-dark'
              checked={switchTimer.isActive}
              onChange={onTimerActiveChange}
            />

            <span className='text-sm text-white-300 ml-2 mr-2'>
              Switch every
            </span>

            <Input
              onChange={onTimerValueChange}
              value={switchTimer.value}
              className='md:w-20 sm:w-12 xsm:w-12 h-19 rs-theme-dark'
            />

            <span className='text-sm text-white-300 ml-2'>sec</span>
          </div>

          <div
            className='flex items-center justify-center cursor-pointer'
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

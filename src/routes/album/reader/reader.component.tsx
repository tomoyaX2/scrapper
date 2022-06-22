import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { SelectPicker, InputNumber, Checkbox } from 'rsuite';
import { fetchAlbumFx, $readerPage, changeReaderPageFx } from '@entities/album';
import { scrapperUrl } from '@shared/api';
import { createView } from '@shared/lib/view';
import { Arrow } from '@shared/ui/atoms/icons/arrow';

const props = {
  reader: $readerPage,
  fetchAlbum: fetchAlbumFx,
  onChangeReaderPage: changeReaderPageFx
};

let clickTimeout = setTimeout(() => {});
let switchPageIndexTimeout = setTimeout(() => {});

const onHandleTouch =
  (callback: (event: TouchEvent) => void) => (event: TouchEvent) => {
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => callback(event), 100);
  };

const switchPageTimeoutHandler = ({
  isActive,
  value,
  onChangeReaderPage,
  currentPage,
  totalPages
}: {
  isActive: boolean;
  value: number;
  onChangeReaderPage: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
}) => {
  if (isActive) {
    clearTimeout(switchPageIndexTimeout);

    if (totalPages > currentPage) {
      switchPageIndexTimeout = setTimeout(() => {
        onChangeReaderPage(currentPage + 1);
        switchPageTimeoutHandler({
          isActive,
          value,
          onChangeReaderPage,
          currentPage: currentPage + 1,
          totalPages
        });
      }, value * 1000);

      return;
    }
  }
  clearTimeout(switchPageIndexTimeout);
};

const Reader = createView()
  .props(props)
  .view(
    ({
      reader: { currentPage, images, pagesList },
      onChangeReaderPage,
      fetchAlbum
    }) => {
      const router = useRouter();

      const [switchTimer, setSwitchTimer] = useState({
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

      const onTimerValueChange = (value: string | number) => {
        const result = typeof value === 'string' ? parseInt(value) : value;
        const resultState = { ...switchTimer, value: result };
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

      return (
        <div className='w-full'>
          <div className='flex flex-row bg-primary w-full h-16 items-center justify-center'>
            <Arrow
              fill={currentPage > 1 ? 'white' : 'gray'}
              className='rotate-180 cursor-pointer'
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
              className='cursor-pointer'
              onClick={() => onChangeReaderPage(nextPage)}
            />

            <span className='text-sm text-white-300 ml-8 mr-2'>
              Auto switch on:
            </span>

            <InputNumber
              onChange={onTimerValueChange}
              value={switchTimer.value}
              className='w-32 h-19'
            />

            <span className='text-sm text-white-300 ml-2'>seconds</span>

            <span className='text-sm text-white-300 ml-8'>Is active:</span>

            <Checkbox
              className='rs-theme-dark'
              checked={switchTimer.isActive}
              onChange={onTimerActiveChange}
            />
          </div>

          <div
            className='flex items-center justify-center cursor-pointer'
            //@ts-expect-error cause of i want
            onTouchStart={onTouchEvent}
            //@ts-expect-error cause of i want
            onClick={onClickEvent}
          >
            <Image
              src={`${scrapperUrl}/${images[currentPage - 1]?.url}`}
              loader={({ src, width }) => `${src}?w=${width}`}
              alt='preview'
              width={700}
              height={900}
            />
          </div>
        </div>
      );
    }
  );

export { Reader };

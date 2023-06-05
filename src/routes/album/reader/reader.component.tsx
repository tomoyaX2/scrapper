import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SelectPicker } from 'rsuite';
import { Arrow } from 'src/components/common/icons/arrowRight';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getReaderImages } from 'src/store/reader';
import { changeReaderPage } from 'src/store/reader';
import { Image } from 'src/components/common/image';
import { NextSeo } from 'next-seo';
import { getAlbum } from 'src/store/album';
import ReactGA from 'react-ga4';
import { ScrollToUpArrow } from 'src/components/common/scrollArrow';

const Reader = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { images, currentPage, pagesList } = useAppSelector(
    state => state.reader
  );

  useEffect(() => {
    if (!!images.length) {
      ReactGA.send({ hitType: 'pageview', page: window.location.href });
      const currentPageUrl = localStorage.getItem('saved-page');
      const currentPageIndex = images.findIndex(
        el => el.url === currentPageUrl
      );
      dispatch(changeReaderPage(currentPageIndex));
    }
  }, [!!images.length]);

  useEffect(() => {
    router.query?.id && dispatch(getReaderImages(router.query.id as string));
    router.query?.id &&
      dispatch(
        getAlbum({
          albumId: Array.isArray(router.query?.id)
            ? router.query.id[0]
            : router.query.id,
          onError: async () => router.push('/')
        })
      );
  }, [router.query.id]);

  if (!images.length) {
    return <div />;
  }

  const handleChangePage = (page: number) => {
    dispatch(changeReaderPage(page));
  };

  const prevPage = !!currentPage ? currentPage - 1 : 0;
  const nextPage =
    currentPage < images.length - 1 ? currentPage + 1 : currentPage;

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
        </div>
        <div className='flex items-center flex-col justify-center cursor-pointer mt-4'>
          <div className='md:w-full sm:w-[550px] xsm:w-[320px] flex items-center justify-center flex-col'>
            {images.map((el, index) => (
              <Image
                url={el?.url}
                width={800}
                height={1200}
                alt='preview'
                key={el.id}
                id={el.id}
                allowIntersection={index > 5}
                activeUrl={images[currentPage]?.url}
                className='mt-2'
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      <ScrollToUpArrow />
    </>
  );
};

export { Reader };

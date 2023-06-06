/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DefaultSeo as Seo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageList } from '@routes/home/pagination/ui';
import { DEFAULT_SEO } from '@shared/config/seo';
import { getTags } from 'src/store/tags';
import { getTypes } from 'src/store/types';
import { getLanguages } from 'src/store/languages';
import { getSeries } from 'src/store/series';
import { getAuthors } from 'src/store/authors';
import { getGroups } from 'src/store/groups';
import { SearchBar } from 'src/components/search-bar';
import { Album } from '@routes/home/album';
import { useAppDispatch, useAppSelector } from 'src/store';
import ReactGA from 'react-ga4';
import { getUser } from 'src/store/user';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector(state => state.albums);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getTypes());
    dispatch(getLanguages());
    dispatch(getSeries());
    dispatch(getAuthors());
    dispatch(getGroups());
    dispatch(getUser());
    ReactGA.send({ hitType: 'pageview' });
  }, []);

  const router = useRouter();
  if (router.isReady) {
    return (
      <>
        <Seo
          {...DEFAULT_SEO}
          additionalMetaTags={[
            {
              property: 'dc:keywords',
              content:
                'mangamischief, hentai, manga, manhwa, adult manga, adult manhwa, hentai manga, hentai manhwa'
            }
          ]}
          canonical='https://mangamischief.com'
        />

        <div className='flex flex-col'>
          <div className='w-full bg-[#1a1d24] p-1 flex justify-center'>
            <span className='text-left text-xs px-4'>
              Welcome! This resource is ad-free and i want to leave it as as in
              the future too. Also i&apos;m planning to add new features ( e.g.
              anime, UI improvements ), so if you wanna to support me, you can
              do it through:{'  '}
              <a href='https://www.patreon.com/MangaMischief'>
                <u>Patreon</u>
              </a>
            </span>
          </div>
          <SearchBar />

          {isLoading ? (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-row items-center justify-center flex-wrap xl:px-12 md:px-4 xsm:px-1 py-4'>
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
          ) : (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-row items-center justify-center flex-wrap xl:px-12 md:px-4 xsm:px-1 py-4'>
                {data.map(album => (
                  <Album album={album} key={album.id} isHome />
                ))}
              </div>

              {data.length ? <PageList /> : null}
            </div>
          )}
        </div>
      </>
    );
  }

  return <div />;
};

export { Home };

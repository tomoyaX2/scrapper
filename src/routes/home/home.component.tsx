/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DefaultSeo as Seo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageList } from 'src/components/pagination/ui';
import { DEFAULT_SEO } from '@shared/config/seo';
import { getTags } from 'src/store/tags';
import { getTypes } from 'src/store/types';
import { getLanguages } from 'src/store/languages';
import { getSeries } from 'src/store/series';
import { getAuthors } from 'src/store/authors';
import { getGroups } from 'src/store/groups';
import { SearchBar } from 'src/components/search-bar';
import { Album } from 'src/components/album';
import { useAppDispatch, useAppSelector } from 'src/store';
import ReactGA from 'react-ga4';

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
    ReactGA.send({ hitType: 'pageview', page: window.location.href });
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
                'xmanga, x-manga, hentai, manga, manhwa, adult manga, xmanga adult manhwa, hentai manga, hentai manhwa'
            }
          ]}
          canonical='https://xmanga.org'
        />

        <div className='flex flex-col'>
          <SearchBar />

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
          ) : (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
                {data.map(album => (
                  <Album album={album} key={album.id} />
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

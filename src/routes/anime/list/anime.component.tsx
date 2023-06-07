/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DefaultSeo as Seo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DEFAULT_SEO } from '@shared/config/seo';
import { AnimeItem } from '@routes/anime/list/animeItem';
import { useAppDispatch, useAppSelector } from 'src/store';
import ReactGA from 'react-ga4';
import { getUser } from 'src/store/user';
import { getVideoTags } from 'src/store/anime/tags';
import { getVideoTypes } from 'src/store/anime/types';
import { getVideoLanguages } from 'src/store/anime/languages';
import { PageList } from './pagination/ui';
import { changeSearchState, getAnimeList } from 'src/store/anime/list';
import { searchTimeoutHandler } from '@shared/utils/timeoutHandler';
import { buildSearchState } from '@shared/utils/pagination';

const Anime = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, isLoading, search } = useAppSelector(state => state.anime.list);

  useEffect(() => {
    dispatch(getVideoTags());
    dispatch(getVideoTypes());
    dispatch(getVideoLanguages());
    dispatch(getUser());
    ReactGA.send({ hitType: 'pageview' });
  }, []);

  useEffect(() => {
    const searchData = buildSearchState(router, search.perPage);
    dispatch(changeSearchState(searchData));
    const callback = () => {
      dispatch(getAnimeList(searchData));
    };
    searchTimeoutHandler(callback);
  }, [router.query]);

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
                  .map(anime => (
                    <AnimeItem anime={anime} key={anime.id} />
                  ))}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
                {data.map(anime => (
                  <AnimeItem anime={anime} key={anime.id} />
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

export { Anime };

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DefaultSeo as Seo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageList } from '@routes/home/pagination/ui';
import { DEFAULT_SEO } from '@shared/config/seo';
import { AnimeItem } from '@routes/anime/list/animeItem';
import { useAppDispatch, useAppSelector } from 'src/store';
import ReactGA from 'react-ga4';
import { getUser } from 'src/store/user';
import { getVideoTags } from 'src/store/anime/tags';
import { getVideoTypes } from 'src/store/anime/types';
import { getVideoLanguages } from 'src/store/anime/languages';
import { getAnimeList } from 'src/store/anime/list';

const Anime = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector(state => state.anime.list);

  useEffect(() => {
    dispatch(getAnimeList({ page: 1, perPage: 20 }));
    dispatch(getVideoTags());
    dispatch(getVideoTypes());
    dispatch(getVideoLanguages());
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

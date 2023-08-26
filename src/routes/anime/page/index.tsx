import { DefaultSeo as Seo } from 'next-seo';
import { Rate } from 'rsuite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tag, Button } from 'rsuite';
import { TITLE_SEO } from '@shared/config/seo';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Image } from 'src/components/common/image';
import ReactGA from 'react-ga4';
import { TrashIcon } from 'src/components/common/icons/trash';
import { getUser } from 'src/store/user';
import { PopoverWindow } from 'src/components/common/menu';
import { StarIcon } from 'src/components/common/icons/star';
import { TagsList } from 'src/components/common/tagsList';
import {
  changeVideoTitle,
  deleteVideo,
  getVideoRate,
  rateVideo
} from 'src/store/anime/item';
import { Episode, VideoState } from 'src/store/anime/item/types';
import { Video } from './video';
import { HorisontalScrollSelector } from 'src/components/common/selectorHorisontal';
import { Redactor } from 'src/components/common/icons/redactor';
import { Input } from 'src/components/common/input/input';

const AnimePage = ({
  initialData: video
}: {
  initialData: VideoState;
}): JSX.Element => {
  const [episodes] = useState(video.episodes);
  const sortedEpisodes = episodes.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  const [activeEpisode, setActiveEpisode] = useState<Episode | undefined>(
    sortedEpisodes[0]
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentRate = useAppSelector(state => state.anime.item.currentRate);
  const { data: user } = useAppSelector(state => state.user);
  const freshRate = useAppSelector(state => state.anime.item.rate);
  const [redactorMode, setRedactorMode] = useState(false);
  const [newTitle, setNewTitle] = useState(video.title);

  useEffect(() => {
    if (!video?.id) {
      router.push('/');
    }
  }, [video?.id]);

  useEffect(() => {
    if (video?.id) {
      dispatch(getUser());
      dispatch(getVideoRate({ videoId: video.id }));
      ReactGA.send({ hitType: 'pageview', page: window.location.href });
    }
  }, [router.query.id]);

  const handleChangeRedactorMode = () => {
    setRedactorMode(!redactorMode);
  };

  const onChangeVideoTitle = ({
    title,
    videoId
  }: {
    title: string;
    videoId: string;
  }) => {
    dispatch(changeVideoTitle({ title, videoId }));
  };

  const onSelectEpisode = (episodeId: string) => {
    setActiveEpisode(episodes?.find(episode => episode.id == episodeId));
  };

  const onDeleteVideo = () => {
    dispatch(deleteVideo(video?.id));
    router.push('/');
  };

  const onRateVideo = (rate: number) => {
    dispatch(rateVideo({ videoId: video?.id, rate }));
  };
  const targetRate = freshRate ? freshRate : video?.rate;
  return (
    <>
      <Seo
        {...TITLE_SEO({
          title: `${video?.title}`,
          language: video?.language?.name ?? ''
        })}
        canonical={window.location.href}
      />
      {video && (
        <div className='flex flex-row w-full justify-center pb-4 '>
          <div className='flex flex-col items-center justify-start mt-4 w-full'>
            {/* {user.isAdmin && (
              <Button
                className='w-[40rem] h-[20rem]'
                onClick={() => {
                  navigator.clipboard.writeText(video.id);
                }}
              >
                COPY ANIME ID <br />
                You are gay if clicked it (updated)
              </Button>
            )} */}
            <div>
              <HorisontalScrollSelector
                name='Select Episode'
                data={sortedEpisodes}
                callback={(episodeId: string) => onSelectEpisode(episodeId)}
                activeEpisode={activeEpisode}
              />
              {activeEpisode ? <Video activeEpisode={activeEpisode} /> : null}
            </div>

            <div className='flex mt-12 md:flex-row sm:flex-col xsm:flex-col sm:px-4 xsm:px-4 lg:px-24 md:px-4 py-4 bg-secondary lg:max-w-gallery md:max-w-unset sm:max-w-unset xs:max-w-unset md:w-full sm:w-full xsm:w-full'>
              <div className='flex items-center justify-center lg:w-112 md:w-full sm:w-full xsm:w-full'>
                <Image
                  url={video.coverImageUrl ?? ''}
                  width={400}
                  height={400}
                  alt='preview'
                  className='lg:h-[400px] lg:w-auto xsm:h-[300px] xsm:w-[250px] max-w-full'
                />
              </div>
              <div className='flex flex-col items-start justify-between sm:px-1 xsm:px-1 lg:pl-32 ms:px-4 xsm:ml-4 sm:ml-4 lg:ml-0 lg:mt-0 md:mt-2 sm:mt-4 xsm:mt-4'>
                <div>
                  {user.isAdmin && (
                    <Button
                      className='float-right ml-3'
                      onClick={handleChangeRedactorMode}
                    >
                      <Redactor fill='white' />
                    </Button>
                  )}
                  <div className='flex flex-col'>
                    {redactorMode ? (
                      <div className='flex flex-row'>
                        <Input
                          containerClassName='w-[28rem]'
                          inputClassName='text-lg'
                          value={newTitle}
                          onChange={value => setNewTitle(value)}
                        />
                        <Button
                          className='w-24'
                          onClick={() => {
                            onChangeVideoTitle({
                              videoId: video.id,
                              title: newTitle
                            });
                            setRedactorMode(false);
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    ) : (
                      <h1 className='text-lg flex flex-row'>{newTitle}</h1>
                    )}

                    <div className='flex flex-row items-center justify-start w-12'>
                      <span>{targetRate?.toFixed(1)}</span>

                      <StarIcon className='w-5 h-5 ml-2' fill='white' />
                    </div>
                  </div>

                  {video.language?.name ? (
                    <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                      <span className='text-sm mr-4 w-20'>Language:</span>

                      <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                        {video.language.name}
                      </Tag>
                    </div>
                  ) : null}

                  {video.type?.name ? (
                    <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                      <span className='text-sm mr-4 w-20'>Type:</span>

                      <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                        {video.type.name}
                      </Tag>
                    </div>
                  ) : null}

                  {video.tags?.length || user.isAdmin ? (
                    <div className='flex flex-row items-center justify-start w-full mt-4 '>
                      <span className='text-sm mr-4 w-20 flex-none'>Tags:</span>

                      <TagsList
                        items={video.tags ?? []}
                        allowRedirect={false}
                        redactorMode={redactorMode}
                        sourceId={video.id}
                        source='video'
                      />
                    </div>
                  ) : null}

                  <div className='flex flex-row items-center justify-start flex-wrap w-full mt-4'>
                    <span className='text-sm mr-4 w-20'>Episodes count:</span>

                    <span className='text-sm'>{video.episodes.length}</span>
                  </div>
                </div>

                <div className='w-full flex items-center justify-start mt-4 mb-2'>
                  {user.isAdmin && (
                    <Button
                      className='flex items-center'
                      onClick={onDeleteVideo}
                    >
                      <TrashIcon className='w-6 h-6 mt-1' fill='white' />
                      Remove
                    </Button>
                  )}
                </div>

                {user?.id ? (
                  <div className='w-full flex items-center justify-start mt-1 mb-2 flex-row'>
                    <span className='text-sm mr-4 w-20'>Rate this:</span>

                    <div className='m-3'>
                      <Rate
                        size='xs'
                        color='cyan'
                        onChange={onRateVideo}
                        value={currentRate}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex items-center justify-start mt-1 mb-2 flex-row'>
                    <span className='text-sm mr-4 w-20'>Rate this:</span>

                    <div className='m-3'>
                      <PopoverWindow
                        placement='top'
                        trigger='hover'
                        content={
                          <span>
                            You have to be logged it for rate this title
                          </span>
                        }
                      >
                        <Rate size='xs' color='cyan' value={currentRate} />
                      </PopoverWindow>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { AnimePage };

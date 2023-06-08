import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faExpand,
  faGear,
  faVolumeXmark,
  faVolumeHigh
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'src/components/common/Slider';
import { Whisper, Tooltip, Dropdown, SelectPicker } from 'rsuite';
import { TimelineTooltip } from './tooltip';
import screenfull from 'screenfull';
import { Episode } from 'src/store/anime/item/types';

interface ControlsState {
  isVisible: boolean;
  paused: boolean;
  playbackSpeed: number;
  quality: string;
  muted: boolean;
}

const handleLeadZero = Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2
});

const formatDuration = (duration: number) => {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return !hours
    ? `${minutes}:${handleLeadZero.format(seconds)}`
    : `${hours}:${handleLeadZero.format(minutes)}:${handleLeadZero.format(
        seconds
      )}`;
};
let fullScreenMouseMoveTimeout = setTimeout(() => {});

const playbackOptions = [0.5, 1, 1.5, 2];

const leftArrowIndex = 'ArrowLeft';
const rightArrowIndex = 'ArrowRight';
const spaceIndex = 'Space';

const Video = ({ episodes }: { episodes: Episode[] }): JSX.Element => {
  const sliderRef = useRef();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [controlsState, setControlsState] = useState<ControlsState>({
    isVisible: false,
    paused: true,
    playbackSpeed: 1,
    quality: 'Original',
    muted: false
  });
  const [activeEpisodeId, setActiveEpisodeId] = useState(episodes[0].id);
  const activeEpisode = useMemo(
    () => episodes.find(episode => episode.id === activeEpisodeId),
    [episodes, activeEpisodeId]
  );

  const [preloadPercent, setPreloadPercent] = useState(0);
  const [timeline, setTimeline] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState(0);
  const isFullscreen = useMemo(
    () => !!document.fullscreenElement,
    [!document.fullscreenElement]
  );

  const changeVisibility = (isVisible: boolean) => () => {
    setControlsState({ ...controlsState, isVisible });
  };

  const changePausedState = (paused: boolean) => () => {
    setControlsState({ ...controlsState, paused });
    controlsState.paused ? videoRef.current?.play() : videoRef.current?.pause();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const keyIndex = event.code;
      if (keyIndex === rightArrowIndex) {
        setTimeline(prevState => {
          (videoRef.current ?? { currentTime: 0 }).currentTime = prevState + 10;

          return prevState + 10;
        });
      }
      if (keyIndex === leftArrowIndex) {
        setTimeline(prevState => {
          (videoRef.current ?? { currentTime: 0 }).currentTime = prevState - 10;
          return prevState - 10;
        });
      }
      if (keyIndex === spaceIndex) {
        setControlsState(prevState => {
          prevState.paused
            ? videoRef.current?.play()
            : videoRef.current?.pause();
          return { ...prevState, paused: !prevState.paused };
        });
      }
    };
    const timeListenner = () => {
      setTimeline(videoRef?.current?.currentTime ?? 0);
    };
    const loadedListenner = () => {
      setDuration(videoRef?.current?.duration ?? 0);
    };

    videoRef.current?.addEventListener('timeupdate', timeListenner);
    videoRef.current?.addEventListener('loadeddata', loadedListenner);
    document?.addEventListener('keydown', handleKeyPress);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', timeListenner);
      videoRef.current?.removeEventListener('loadeddata', timeListenner);
      document?.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeEpisode?.url]);

  useEffect(() => {
    if (videoRef.current?.buffered) {
      try {
        const end = videoRef.current?.buffered?.length - 1;
        const result = videoRef.current?.buffered?.end(end);
        if (result !== preloadPercent) {
          setPreloadPercent(result);
        }
      } catch (e) {
        console.log('error', e);
      }
    }
  }, [timeline]);

  const checkIfMouseMoved = useCallback(() => {
    if (isFullscreen) {
      setControlsState(prevState => ({
        ...prevState,
        isVisible: true
      }));
      clearTimeout(fullScreenMouseMoveTimeout);
      fullScreenMouseMoveTimeout = setTimeout(() => {
        setControlsState(prevState => ({
          ...prevState,
          isVisible: false
        }));
      }, 2000);
    }
  }, [isFullscreen]);

  const changeFullScreen = () => {
    screenfull.toggle();
  };

  const changeMuted = (muted: boolean) => () => {
    setControlsState({ ...controlsState, muted });
    (videoRef.current ?? { muted: false }).muted = muted;
  };

  const fullScreenStyle =
    'fixed w-screen h-screen mt-0 top-0 left-0 object-fill';
  const isVisibleControls = controlsState.isVisible || controlsState.paused;

  return (
    <div
      className={`flex flex-row flex-wrap items-center  justify-center bg-secondary z-10  ${
        isFullscreen ? fullScreenStyle : 'relative mt-4 w-[75rem]'
      }`}
      onMouseEnter={changeVisibility(true)}
      onMouseLeave={changeVisibility(false)}
    >
      <video
        src={activeEpisode?.url}
        onClick={changePausedState(!controlsState.paused)}
        ref={videoRef}
        className={`aspect-video object-fill ${
          isFullscreen ? fullScreenStyle : 'w-[75rem]'
        }`}
        onMouseMove={checkIfMouseMoved}
      />
      {isVisibleControls && (
        <>
          <SelectPicker
            data={episodes.map(e => ({
              label: e.name,
              value: e.id
            }))}
            className='absolute left-2 top-0 w-32 mr-4 my-2 '
            menuClassName='z-10'
            searchable={false}
            value={activeEpisodeId}
            cleanable={false}
            onChange={value => setActiveEpisodeId(value)}
          />
          <div className='absolute left-0 bottom-0 opacity-10 bg-third z-2 flex h-12 w-full' />
          <div className='absolute left-0 bottom-0 z-3 flex flex-col w-full'>
            <Whisper
              followCursor
              placement='top'
              speaker={
                <Tooltip>
                  <TimelineTooltip
                    src={activeEpisode?.url ?? ''}
                    time={previewTime}
                    formattedTime={formatDuration(previewTime)}
                  />
                </Tooltip>
              }
            >
              <div className='px-4'>
                <Slider
                  progress
                  max={duration}
                  ref={sliderRef}
                  prefill={preloadPercent}
                  min={0}
                  value={timeline}
                  tooltip={false}
                  onMouseMoveDataHandler={(time: number) => {
                    setPreviewTime(time);
                  }}
                  onChange={(currentPlayTime: number) => {
                    (videoRef.current ?? { currentTime: 0 }).currentTime =
                      currentPlayTime;
                    setTimeline(currentPlayTime);
                  }}
                />
              </div>
            </Whisper>
            <div className='flex h-12 w-full  justify-between items-center '>
              <div className='flex flex-row'>
                <div
                  className='cursor-pointer w-8 h-8 hover:bg-black-100 rounded-md flex items-center justify-center'
                  onClick={changePausedState(!controlsState.paused)}
                >
                  <FontAwesomeIcon
                    icon={controlsState.paused ? faPlay : faPause}
                  />
                </div>
                {!isNaN(duration) && (
                  <div className='flex flex-row items-center ml-2'>
                    <span className='text-white text-xs'>
                      {formatDuration(timeline)} \ {formatDuration(duration)}
                    </span>
                  </div>
                )}
              </div>
              <div className='flex flex-row items-center justify-center'>
                <Dropdown
                  placement='topEnd'
                  activeKey={controlsState.playbackSpeed}
                  onSelect={(playbackSpeed: number) => {
                    setControlsState({ ...controlsState, playbackSpeed });
                    (videoRef.current ?? { playbackRate: 1 }).playbackRate =
                      playbackSpeed;
                  }}
                  renderToggle={props => (
                    <span
                      {...props}
                      className='mr-2 hover:bg-black-100 h-8 flex items-center justify-center rounded-md px-2'
                    >
                      {controlsState.playbackSpeed} x
                    </span>
                  )}
                >
                  {playbackOptions.map(el => (
                    <Dropdown.Item
                      eventKey={el}
                      key={el}
                      active={el === controlsState.playbackSpeed}
                    >
                      {el}x
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <div
                  className='cursor-pointer w-8 h-8 hover:bg-black-100 rounded-md flex items-center justify-center mr-2  py-3 mt-1'
                  onClick={changeMuted(!controlsState.muted)}
                >
                  <FontAwesomeIcon
                    icon={controlsState.muted ? faVolumeXmark : faVolumeHigh}
                  />
                </div>
                <Dropdown
                  placement='topEnd'
                  activeKey={controlsState.quality}
                  renderToggle={props => (
                    <div
                      {...props}
                      className='hover:bg-black-100 w-8 h-8 flex items-center justify-center rounded-md mr-2 py-3 mt-1'
                    >
                      <FontAwesomeIcon icon={faGear} />
                    </div>
                  )}
                  onSelect={(quality: string) => {
                    setControlsState({ ...controlsState, quality });
                  }}
                >
                  {!activeEpisode?.qualities?.length && (
                    <Dropdown.Item
                      eventKey='Original'
                      active
                      className='bg-black-100'
                    >
                      Original
                    </Dropdown.Item>
                  )}
                  {(activeEpisode?.qualities ?? [])?.map(el => (
                    <Dropdown.Item
                      eventKey={el}
                      key={el}
                      active={el === controlsState.quality}
                    >
                      {el}
                    </Dropdown.Item>
                  ))}
                </Dropdown>

                <Dropdown
                  placement='topEnd'
                  activeKey={controlsState.playbackSpeed}
                  onSelect={(playbackSpeed: number) => {
                    setControlsState({ ...controlsState, playbackSpeed });
                    (videoRef.current ?? { playbackRate: 1 }).playbackRate =
                      playbackSpeed;
                  }}
                  renderToggle={props => (
                    <span
                      {...props}
                      className=' hover:bg-black-100 h-8 flex items-center justify-center rounded-md px-2 mr-3'
                    >
                      {controlsState.playbackSpeed} x
                    </span>
                  )}
                >
                  {playbackOptions.map(el => (
                    <Dropdown.Item
                      eventKey={el}
                      key={el}
                      active={el === controlsState.playbackSpeed}
                    >
                      {el}x
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <div
                  className='cursor-pointer px-2 h-8 flex items-center justify-center hover:bg-black-100 rounded-md mr-3 mt-1'
                  onClick={changeFullScreen}
                >
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { Video };

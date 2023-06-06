import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'rsuite';

interface ControlsState {
  isVisible: boolean;
  paused: boolean;
  playbackSpeed: number;
  quality: string;
}

interface TimelineState {
  currentPlayTime: number;
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

let playTimeout = setTimeout(() => {});

const Video = ({ activeUrl }: { activeUrl: string }): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [controlsState, setControlsState] = useState<ControlsState>({
    isVisible: false,
    paused: true,
    playbackSpeed: 1,
    quality: '720p'
  });
  const duration = videoRef.current?.duration ?? 0;

  const [timelineState, setTimelineState] = useState<TimelineState>({
    currentPlayTime: 0
  });

  const changeVisibility = (isVisible: boolean) => () => {
    setControlsState({ ...controlsState, isVisible });
  };

  const changePausedState = (paused: boolean) => () => {
    setControlsState({ ...controlsState, paused });
    controlsState.paused ? videoRef.current?.play() : videoRef.current?.pause();
  };

  useEffect(() => {
    const timeListenner = () => {
      setTimelineState({
        ...timelineState,
        currentPlayTime: videoRef?.current?.currentTime ?? 0
      });
    };
    videoRef.current?.addEventListener('timeupdate', timeListenner);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', timeListenner);
    };
  }, [activeUrl]);

  return (
    <div
      className='flex flex-row flex-wrap items-center w-[75rem] justify-center bg-secondary mt-4 relative'
      onMouseEnter={changeVisibility(true)}
      onMouseLeave={changeVisibility(false)}
    >
      <video
        src={activeUrl}
        onClick={changePausedState(!controlsState.paused)}
        ref={videoRef}
        className='w-[75rem]'
      />
      {(controlsState.isVisible || controlsState.paused) && (
        <>
          <div className='absolute left-0 bottom-0 opacity-10 bg-third z-2 flex h-12 w-full' />
          <div className='absolute left-0 bottom-0 z-3 flex flex-col w-full'>
            <Slider
              progress
              max={duration}
              min={0}
              value={timelineState.currentPlayTime}
              onChange={currentPlayTime => {
                (videoRef.current ?? { currentTime: 0 }).currentTime =
                  currentPlayTime;
                setTimelineState({ ...timelineState, currentPlayTime });
              }}
            />
            <div className=' flex h-12 w-full flex items-center justify-start px-4'>
              <div
                className='cursor-pointer w-6 h-6'
                onClick={changePausedState(!controlsState.paused)}
              >
                <FontAwesomeIcon
                  icon={controlsState.paused ? faPlay : faPause}
                />
              </div>
              {!isNaN(duration) && (
                <div className='flex flex-row items-center ml-2'>
                  <span className='text-white text-xs'>
                    {formatDuration(timelineState.currentPlayTime)} \{' '}
                    {formatDuration(duration)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { Video };

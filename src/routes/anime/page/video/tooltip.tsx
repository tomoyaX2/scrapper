import { useEffect, useRef } from 'react';

interface TimelineTooltipProps {
  src: string;
  time: number;
  formattedTime: string;
}

const TimelineTooltip = ({
  src,
  time,
  formattedTime
}: TimelineTooltipProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (videoRef.current ?? { currentTime: 0 }).currentTime = time;
  }, [time]);

  return (
    <div className='flex flex-col'>
      <video src={src} className='w-40 h-40' preload='auto' ref={videoRef} />
      <span>{formattedTime}</span>
    </div>
  );
};

export { TimelineTooltip };

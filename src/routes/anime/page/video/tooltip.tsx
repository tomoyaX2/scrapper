import { useEffect, useRef } from 'react';

interface TimelineTooltipProps {
  src: string;
  time: number;
}

const TimelineTooltip = ({ src, time }: TimelineTooltipProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(time, 'time');
    (videoRef.current ?? { currentTime: 0 }).currentTime = time;
  }, [time]);

  return <video src={src} className='w-20 h-20' ref={videoRef} />;
};

export { TimelineTooltip };

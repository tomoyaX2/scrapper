import { Episode } from 'src/store/anime/item/types';

export interface HorisontalScrollSelectorProps {
  name: string;
  data: Episode[];
  activeEpisode?: Episode;
  callback?: Function;
}

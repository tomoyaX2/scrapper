import { Anime } from 'src/store/anime/list/types';

type AnimeProps = {
  anime: Anime;
  page?: number;
  perPage?: number;
};

export type { AnimeProps };

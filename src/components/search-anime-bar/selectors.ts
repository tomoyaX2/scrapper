import { createSelector } from 'reselect';
import { RootState } from 'src/store';

export const optionsAnimeSelector = createSelector(
  (state: RootState) => state.anime.list,
  videosSelector => ({
    videosSelector
  })
);

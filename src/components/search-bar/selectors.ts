import { createSelector } from 'reselect';
import { RootState } from 'src/store';

export const optionsSelector = createSelector(
  (state: RootState) => state.tags,
  (state: RootState) => state.types,
  (state: RootState) => state.languages,
  (state: RootState) => state.series,
  (state: RootState) => state.authors,
  (state: RootState) => state.groups,
  (state: RootState) => state.albums,
  (
    tagsSelector,
    typesSelector,
    languagesSelector,
    seriesSelector,
    authorsSelector,
    groupsSelector,
    albumsSelector
  ) => ({
    tagsSelector,
    typesSelector,
    languagesSelector,
    seriesSelector,
    authorsSelector,
    groupsSelector,
    albumsSelector
  })
);

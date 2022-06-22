// import type { GetServerSidePropsContext } from 'next';
import { sample } from 'effector';
import { getAuthorsFx } from '@entities/author';
import { getGroupsFx } from '@entities/groups';
import { getLanguagesFx } from '@entities/language';
import { getSeriesFx } from '@entities/series';
import { getTagsFx } from '@entities/tag';
import { getTypesFx } from '@entities/type';
import { createPage } from '@shared/lib/effector';

const searchBar = createPage();

sample({
  clock: searchBar.enter,

  target: getTagsFx
});

sample({
  clock: searchBar.enter,

  target: getTypesFx
});

sample({
  clock: searchBar.enter,

  target: getLanguagesFx
});

sample({
  clock: searchBar.enter,

  target: getSeriesFx
});

sample({
  clock: searchBar.enter,

  target: getAuthorsFx
});

sample({
  clock: searchBar.enter,

  target: getGroupsFx
});

export { searchBar };

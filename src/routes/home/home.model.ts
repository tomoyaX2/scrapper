// import type { GetServerSidePropsContext } from 'next';
import { sample } from 'effector';
import { getAuthorsFx } from '@entities/author';
import { getGroupsFx } from '@entities/groups';
import { getLanguagesFx } from '@entities/language';
import { getSeriesFx } from '@entities/series';
import { getTagsFx } from '@entities/tag';
import { getTypesFx } from '@entities/type';
import { createPage } from '@shared/lib/effector';

const homePage = createPage();

sample({
  clock: homePage.enter,

  target: getTagsFx
});

sample({
  clock: homePage.enter,

  target: getTypesFx
});

sample({
  clock: homePage.enter,

  target: getLanguagesFx
});

sample({
  clock: homePage.enter,

  target: getSeriesFx
});

sample({
  clock: homePage.enter,

  target: getAuthorsFx
});

sample({
  clock: homePage.enter,

  target: getGroupsFx
});

export { homePage };

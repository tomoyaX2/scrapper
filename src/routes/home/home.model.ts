// import type { GetServerSidePropsContext } from 'next';
import { sample } from 'effector';
import { fetchAlbumsFx } from '@entities/album';
import { createPage } from '@shared/lib/effector';

const homePage = createPage();

sample({
  clock: homePage.enter,

  target: fetchAlbumsFx
});

export { homePage };

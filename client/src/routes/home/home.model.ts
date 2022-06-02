import type { GetServerSidePropsContext } from 'next';
import { createPage } from '@shared/lib/effector';

const homePage = createPage<GetServerSidePropsContext<{}, {}>>();

export { homePage };

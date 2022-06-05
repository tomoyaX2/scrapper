import { DefaultSeo as Seo } from 'next-seo';
// import { CustomProvider } from 'rsuite';
import type { AppProps } from 'next/app';
import { Layout } from '@widgets/layout';
import { DEFAULT_SEO } from '@shared/config/seo';
import { Provider } from './provider';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider>
    <Seo {...DEFAULT_SEO} />

    {/* <CustomProvider theme='dark'> */}

    <Layout>
      {/* @ts-expect-error JSX typings */}

      <Component {...pageProps} />
    </Layout>

    {/* </CustomProvider> */}
  </Provider>
);

export { App };

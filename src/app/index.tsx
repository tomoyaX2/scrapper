// import { CustomProvider } from 'rsuite';
import type { AppProps } from 'next/app';
import { Layout } from '@widgets/layout';
import { Provider } from './provider';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider>
    {/* <CustomProvider theme='dark'> */}

    <Layout>
      {/* @ts-expect-error JSX typings */}

      <Component {...pageProps} />
    </Layout>

    {/* </CustomProvider> */}
  </Provider>
);

export { App };

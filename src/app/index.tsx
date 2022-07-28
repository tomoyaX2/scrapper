// import { CustomProvider } from 'rsuite';
import ReactGA from 'react-ga4';
import type { AppProps } from 'next/app';
import { Layout } from '@widgets/layout';
import { Provider } from './provider';

ReactGA.initialize('G-YJTZZ5SM82');

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

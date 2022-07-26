// import { CustomProvider } from 'rsuite';
import ReactGA from 'react-ga';
import type { AppProps } from 'next/app';
import { Layout } from '@widgets/layout';
import { Provider } from './provider';

ReactGA.initialize('G-YJTZZ5SM82', {});
ReactGA.pageview(window.location.pathname + window.location.search);

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

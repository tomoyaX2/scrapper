// import { CustomProvider } from 'rsuite';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Layout } from 'src/components/layout.component';
import store from 'src/store';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    {/* <CustomProvider theme='dark'> */}

    <Layout>
      {/* @ts-expect-error JSX typings */}

      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export { App };

// import { CustomProvider } from 'rsuite';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'src/components/layout.component';
import store from 'src/store';

const App = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return isMounted ? (
    <Provider store={store}>
      {/* <CustomProvider theme='dark'> */}

      <Layout>
        {/* @ts-expect-error JSX typings */}

        <Component {...pageProps} />
      </Layout>
    </Provider>
  ) : (
    <div />
  );
};

export { App };

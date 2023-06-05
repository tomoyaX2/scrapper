// import { CustomProvider } from 'rsuite';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'src/components/layout/layout.component';
import store, { initToken } from 'src/store';
import ReactGA from 'react-ga4';
import { CustomProvider } from 'rsuite';
ReactGA.initialize('G-NHQCMD7VWN');

const App = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initToken();
  }, []);

  return isMounted ? (
    <CustomProvider theme='dark'>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CustomProvider>
  ) : (
    <div />
  );
};

export { App };

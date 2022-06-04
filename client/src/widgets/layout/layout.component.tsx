import type { FC, PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => (
  <main className={styles.layout}>
    <div className='flex flex-col'>
      <Header />

      <div className='flex flex-col bg-black-300 my-4'>{children}</div>
    </div>

    <Footer />
  </main>
);

export { Layout };

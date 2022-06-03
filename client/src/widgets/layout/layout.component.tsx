import type { FC, PropsWithChildren } from 'react';
import { SearchBar } from '../../features/search-bar';
import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => (
  <main className={styles.layout}>
    <Header />

    <SearchBar />

    <div className='flex flex-col bg-black-300'>{children}</div>

    <Footer />
  </main>
);

export { Layout };

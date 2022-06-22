import type { FC, PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => (
  <main className='flex flex-col items-stretch min-h-screen justify-between'>
    <div className='flex flex-col'>
      <Header />

      <div className='flex flex-col bg-black-300 my-4'>{children}</div>
    </div>

    <Footer />
  </main>
);

export { Layout };

import type { FC, PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { useStoreEffects } from './useStoreEffects';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  useStoreEffects();
  return (
    <main className='flex flex-col items-stretch min-h-screen justify-between'>
      <div className='flex flex-col'>
        <Header />
        <div className='flex flex-col bg-black-300'>{children}</div>
      </div>

      <Footer />
    </main>
  );
};

export { Layout };

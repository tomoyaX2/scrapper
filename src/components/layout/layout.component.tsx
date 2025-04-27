import type { FC, PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { useStoreEffects } from './useStoreEffects';
import Script from 'next/script';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  useStoreEffects();
  return (
    <main className='flex flex-col items-stretch min-h-screen justify-between'>
      <Script
        id='clarity-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
          `
        }}
      />
      <div className='flex flex-col'>
        <Header />
        <div className='flex flex-col bg-black-300'>{children}</div>
      </div>

      <Footer />
    </main>
  );
};

export { Layout };

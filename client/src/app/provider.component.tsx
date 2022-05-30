import type { Scope } from 'effector';

import { Provider as EffectorProvider } from 'effector-react/scope';

import { useRouter } from 'next/router';

import type { FC } from 'react';

import { MediaListener } from '@shared/lib/media';

import { RouterGate } from '@shared/router';

type ProviderProps = {
  /**
   * Effector ssr scope
   */
  scope: Scope;
};

// const themes = {
//   dark,
//   light
// };

const ThemeProvider: FC = ({ children }) => <>{children}</>;

const Provider: FC<ProviderProps> = ({ children, scope }) => {
  const router = useRouter();

  return (
    <EffectorProvider value={scope}>
      {/* @ts-expect-error ti pidor */}

      <RouterGate router={router} />

      <ThemeProvider>
        <MediaListener />

        {children}
      </ThemeProvider>
    </EffectorProvider>
  );
};

export { Provider };
export type { ProviderProps };

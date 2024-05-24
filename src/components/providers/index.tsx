import type { PropsWithChildren } from 'react';

import { ClerkProvider } from './ClerkProvider';
import { QueryProvider } from './QueryProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <QueryProvider>{children}</QueryProvider>
  </ClerkProvider>
);

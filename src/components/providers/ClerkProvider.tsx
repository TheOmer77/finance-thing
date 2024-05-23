import type { PropsWithChildren } from 'react';
import { ClerkProvider as Provider } from '@clerk/nextjs';

import { clerkLocalization, clerkTheme } from '@/constants/clerk';

export const ClerkProvider = ({ children }: PropsWithChildren) => (
  <Provider appearance={clerkTheme} localization={clerkLocalization}>
    {children}
  </Provider>
);

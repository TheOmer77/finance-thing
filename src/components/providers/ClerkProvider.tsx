import type { PropsWithChildren } from 'react';
import { ClerkProvider as Provider } from '@clerk/nextjs';

import { SIGN_IN_URL, SIGN_UP_URL, clerkTheme } from '@/constants/clerk';

export const ClerkProvider = ({ children }: PropsWithChildren) => (
  <Provider
    appearance={clerkTheme}
    signInUrl={SIGN_IN_URL}
    signUpUrl={SIGN_UP_URL}
  >
    {children}
  </Provider>
);

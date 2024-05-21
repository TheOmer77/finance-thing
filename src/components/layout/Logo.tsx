import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

export const Logo = forwardRef<
  ElementRef<'svg'>,
  ComponentPropsWithoutRef<'svg'>
>(({ className, ...props }, ref) => (
  <svg
    {...props}
    ref={ref}
    width='40'
    height='40'
    viewBox='0 0 40 40'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-primary', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M23.901 39.612c10.832-2.155 17.865-12.681 15.71-23.513C37.458 5.267 26.932-1.766 16.1.389 5.267 2.542-1.766 13.068.389 23.9c2.154 10.832 12.68 17.865 23.512 15.71zm-1.76-24.673a4.365 4.365 0 10-6.055 1.204l3.629 2.424zm2.92 7.201a4.365 4.365 0 10-1.204-6.054l-2.424 3.629zm.057 7.77a4.365 4.365 0 00-1.204-6.053l-3.629-2.424-2.425 3.628a4.365 4.365 0 007.258 4.85zM10.09 25.119a4.365 4.365 0 014.85-7.258l3.628 2.425-2.424 3.629a4.365 4.365 0 01-6.054 1.204z'
    />
  </svg>
));
Logo.displayName = 'Logo';

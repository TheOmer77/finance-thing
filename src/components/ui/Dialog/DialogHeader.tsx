import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const DialogHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

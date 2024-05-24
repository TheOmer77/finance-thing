import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const Skeleton = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

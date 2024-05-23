import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const DrawerHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('grid gap-1.5 p-4 text-start', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

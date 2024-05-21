import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const DrawerFooter = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

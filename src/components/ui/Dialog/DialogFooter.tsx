import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const DialogFooter = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('flex flex-row justify-end gap-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

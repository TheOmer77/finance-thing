import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export type EmptyStateProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  text: string;
  icon: ReactNode;
};

export const EmptyState = ({
  text,
  icon,
  className,
  ...props
}: EmptyStateProps) => (
  <div
    {...props}
    className={cn(
      'flex flex-col items-center justify-center gap-3 text-muted-foreground',
      className
    )}
  >
    <Slot className='size-6'>{icon}</Slot>
    <span className='text-sm'>{text}</span>
  </div>
);

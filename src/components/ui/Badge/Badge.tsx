import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { badgeVariants } from './variants';

export type BadgeProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof badgeVariants>;

export const Badge = forwardRef<ElementRef<'div'>, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
    />
  )
);
Badge.displayName = 'Badge';

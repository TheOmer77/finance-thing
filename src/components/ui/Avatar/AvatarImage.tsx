import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Image } from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

export const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ alt, className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    alt={alt}
    {...props}
  />
));
AvatarImage.displayName = Image.displayName;

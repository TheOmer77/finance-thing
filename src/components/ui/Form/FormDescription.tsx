import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { useFormField } from './useFormField';
import { cn } from '@/lib/utils';

export const FormDescription = forwardRef<
  ElementRef<'p'>,
  ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

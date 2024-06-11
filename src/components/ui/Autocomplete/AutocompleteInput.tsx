'use client';

import {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { PopoverAnchor } from '@radix-ui/react-popover';
import { CommandInput } from 'cmdk';
import { ChevronDownIcon } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

import { AutocompleteContext } from './context';

export type AutocompleteInputProps = Omit<
  ComponentPropsWithoutRef<typeof CommandInput>,
  'value' | 'onValueChange'
>;

export const AutocompleteInput = forwardRef<
  ElementRef<typeof CommandInput>,
  AutocompleteInputProps
>(({ className, ...props }, ref) => {
  const {
    inputRef,
    inputValue,
    isMounted,
    lastValidInputValue,
    onInputValueChange,
    onOpenChange,
  } = useContext(AutocompleteContext);

  useImperativeHandle(ref, () => inputRef!.current!, [inputRef]);

  const handleFocus = useCallback(() => onOpenChange?.(true), [onOpenChange]);

  const handleBlur = useCallback(() => {
    onOpenChange?.(false);
    onInputValueChange?.(lastValidInputValue);
  }, [lastValidInputValue, onInputValueChange, onOpenChange]);

  return (
    <PopoverAnchor className='relative'>
      {isMounted ? (
        <CommandInput
          {...props}
          ref={inputRef}
          value={inputValue}
          onValueChange={onInputValueChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn('pe-8', className)}
          asChild
        >
          <Input />
        </CommandInput>
      ) : (
        <Input
          {...props}
          ref={inputRef}
          value={inputValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn('pe-8', className)}
          readOnly
        />
      )}
      <div
        className='pointer-events-none absolute inset-y-0 end-3 grid
place-items-center'
      >
        <ChevronDownIcon className='size-4 opacity-50' />
      </div>
    </PopoverAnchor>
  );
});
AutocompleteInput.displayName = 'AutocompleteInput';

'use client';

import {
  forwardRef,
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
>(({ ...props }, ref) => {
  const { inputValue, onBlur, onFocus, onInputValueChange, inputRef } =
    useContext(AutocompleteContext);

  useImperativeHandle(ref, () => inputRef!.current!, [inputRef]);

  return (
    <PopoverAnchor className='relative'>
      <CommandInput
        {...props}
        ref={inputRef}
        value={inputValue}
        onValueChange={onInputValueChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={cn('pe-8')}
        asChild
      >
        <Input />
      </CommandInput>
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

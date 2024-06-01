'use client';

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type ElementRef,
  type KeyboardEvent,
  type ComponentPropsWithoutRef,
} from 'react';
import { Command as CommandRoot } from 'cmdk';

import { Popover } from '@/components/ui/Popover';

import { AutocompleteContext } from './context';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

export const Autocomplete = forwardRef<
  ElementRef<typeof CommandRoot>,
  ComponentPropsWithoutRef<typeof CommandRoot>
>(({ value, onValueChange, onKeyDown, children, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [lastValidInputValue, setLastValidInputValue] = useState(
    inputValue || ''
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;
      if (!isOpen) setOpen(true);
      if (event.key === 'Escape') input.blur();

      onKeyDown?.(event);
    },
    [isOpen, onKeyDown]
  );

  const handleFocus = useCallback(() => setOpen(true), []);

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(lastValidInputValue);
  }, [lastValidInputValue]);

  const handleSelect = useCallback(
    (value: string, inputValue: string) => {
      setInputValue(inputValue);

      setLastValidInputValue(inputValue);
      onValueChange?.(value);

      // Hack to prevent the input from being focused after the user selects an option
      setTimeout(() => inputRef?.current?.blur(), 0);
    },
    [onValueChange]
  );

  return (
    <AutocompleteContext.Provider
      value={{
        inputRef,
        inputValue,
        isOpen,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onInputValueChange: setInputValue,
        onSelect: handleSelect,
        value,
      }}
    >
      <Popover open={isOpen}>
        <CommandRoot {...props} ref={ref} onKeyDown={handleKeyDown}>
          {children}
        </CommandRoot>
      </Popover>
    </AutocompleteContext.Provider>
  );
});
Autocomplete.displayName = 'Autocomplete';

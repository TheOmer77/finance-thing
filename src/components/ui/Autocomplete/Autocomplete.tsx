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
import { useIsClient } from 'usehooks-ts';

import { Popover } from '@/components/ui/Popover';

import { AutocompleteContext } from './context';

export type AutocompleteProps = ComponentPropsWithoutRef<typeof CommandRoot> & {
  onCreatableSelect?: (
    inputValue: string,
    setValue: (value: string) => void
  ) => void;
};

export const Autocomplete = forwardRef<
  ElementRef<typeof CommandRoot>,
  AutocompleteProps
>(
  (
    { value, onValueChange, onCreatableSelect, onKeyDown, children, ...props },
    ref
  ) => {
    const isMounted = useIsClient();
    const inputRef = useRef<HTMLInputElement>(null),
      listRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
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
          isMounted,
          isOpen,
          lastValidInputValue,
          listRef,
          onCreatableSelect,
          onInputValueChange: setInputValue,
          onOpenChange: setOpen,
          onSelect: handleSelect,
          value,
        }}
      >
        <Popover open={isOpen && isMounted}>
          {!isMounted ? (
            children
          ) : (
            <CommandRoot {...props} ref={ref} onKeyDown={handleKeyDown}>
              {children}
            </CommandRoot>
          )}
        </Popover>
      </AutocompleteContext.Provider>
    );
  }
);
Autocomplete.displayName = 'Autocomplete';

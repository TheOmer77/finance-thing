import { createContext, type RefObject } from 'react';

type AutocompleteContextValue = {
  value?: string;
  inputValue: string;
  lastValidInputValue: string;
  inputRef?: RefObject<HTMLInputElement>;
  listRef?: RefObject<HTMLDivElement>;
  isMounted?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string, inputValue: string) => void;
  onCreatableSelect?: () => void;
  onInputValueChange?: (value: string) => void;
};

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  inputValue: '',
  lastValidInputValue: '',
});

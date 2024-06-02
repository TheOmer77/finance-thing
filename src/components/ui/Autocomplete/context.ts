import { createContext, type RefObject } from 'react';

type AutocompleteContextValue = {
  value?: string;
  inputValue: string;
  inputRef?: RefObject<HTMLInputElement>;
  listRef?: RefObject<HTMLDivElement>;
  placeholder?: string;
  isMounted?: boolean;
  isOpen?: boolean;
  onSelect?: (value: string, inputValue: string) => void;
  onCreatableSelect?: () => void;
  onInputValueChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  inputValue: '',
  onInputValueChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
});

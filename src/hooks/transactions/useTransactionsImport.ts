import { create } from 'zustand';
import type { ParseResult } from 'papaparse';

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {
    aborted: false,
    cursor: 0,
    delimiter: ',',
    linebreak: '\n',
    truncated: false,
  },
} satisfies ParseResult<string[]>;

export type TransactionsImportStore = {
  importResult: ParseResult<string[]>;
  setImportResult: (value: ParseResult<string[]>) => void;
  resetImportResult: () => void;
};

export const useTransactionsImport = create<TransactionsImportStore>(set => ({
  importResult: INITIAL_IMPORT_RESULTS,
  setImportResult: value => set(state => ({ ...state, importResult: value })),
  resetImportResult: () =>
    set(state => ({ ...state, importResult: INITIAL_IMPORT_RESULTS })),
}));

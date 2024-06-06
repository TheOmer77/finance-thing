import { create } from 'zustand';
import type { ParseResult } from 'papaparse';

type ImportResult = ParseResult<string[]>;
type SelectedColumns = Record<string, string | null>;

const INITIAL_IMPORT_RESULT = {
    data: [],
    errors: [],
    meta: {
      aborted: false,
      cursor: 0,
      delimiter: ',',
      linebreak: '\n',
      truncated: false,
    },
  } satisfies ImportResult,
  INITIAL_SELECTED_COLUMNS = {} satisfies SelectedColumns;

export type TransactionsImportStore = {
  importResult: ImportResult;
  setImportResult: (value: ImportResult) => void;

  selectedColumns: SelectedColumns;
  setSelectedColumns: (
    value: SelectedColumns | ((prev: SelectedColumns) => SelectedColumns)
  ) => void;

  resetImport: () => void;
};

export const useTransactionsImport = create<TransactionsImportStore>(set => ({
  importResult: INITIAL_IMPORT_RESULT,
  setImportResult: value => set(state => ({ ...state, importResult: value })),

  selectedColumns: INITIAL_SELECTED_COLUMNS,
  setSelectedColumns: value =>
    set(state => ({
      ...state,
      selectedColumns:
        typeof value === 'function' ? value(state.selectedColumns) : value,
    })),

  resetImport: () =>
    set(state => ({
      ...state,
      importResult: INITIAL_IMPORT_RESULT,
      selectedColumns: INITIAL_SELECTED_COLUMNS,
    })),
}));

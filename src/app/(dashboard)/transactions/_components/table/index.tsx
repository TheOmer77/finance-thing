'use client';

import { useSearchParams } from 'next/navigation';
import type { ParseResult } from 'papaparse';

import { CardContent } from '@/components/ui/Card';
import { DataTable } from '@/components/layout/DataTable';
import { LoadingState } from '@/components/layout/LoadingState';
import { AccountDrawer } from '@/app/(dashboard)/accounts/_components/drawer';
import { CategoryDrawer } from '@/app/(dashboard)/categories/_components/drawer';
import { useTransactions } from '@/hooks/transactions';

import { columns } from './columns';

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

export const TransactionsTable = () => {
  const searchParams = useSearchParams(),
    isImportMode = !!searchParams.get('import');

  const {
    transactions,
    transactionsLoading,
    deleteTransactions,
    deleteTransactionsPending,
  } = useTransactions();

  const disabled = transactionsLoading || deleteTransactionsPending;

  if (transactionsLoading) return <LoadingState variant='table' />;

  if (isImportMode)
    return (
      <CardContent className='text-sm text-muted-foreground'>
        Import screen TBD.
      </CardContent>
    );

  return (
    <>
      <DataTable
        columns={columns}
        data={transactions || []}
        filterKey='payee'
        itemTypeSingle='transaction'
        onDelete={rows => {
          const ids = rows.map(({ original }) => original.id);
          deleteTransactions({ ids });
        }}
        disabled={disabled}
        className='p-6 pt-0'
      />

      <AccountDrawer />
      <CategoryDrawer />
    </>
  );
};

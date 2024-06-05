'use client';

import { useSearchParams } from 'next/navigation';

import { DataTable } from '@/components/layout/DataTable';
import { LoadingState } from '@/components/layout/LoadingState';
import { AccountDrawer } from '@/app/(dashboard)/accounts/_components/drawer';
import { CategoryDrawer } from '@/app/(dashboard)/categories/_components/drawer';
import { useTransactions, useTransactionsImport } from '@/hooks/transactions';

import { columns } from './columns';
import { TransactionsImportTable } from './import-table';

export const TransactionsTable = () => {
  const { importResult } = useTransactionsImport();
  const searchParams = useSearchParams(),
    isImportMode = !!searchParams.get('import') && importResult.data.length > 0;

  const {
    transactions,
    transactionsLoading,
    deleteTransactions,
    deleteTransactionsPending,
  } = useTransactions();

  const disabled = transactionsLoading || deleteTransactionsPending;

  if (transactionsLoading) return <LoadingState variant='table' />;
  if (isImportMode) return <TransactionsImportTable />;

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

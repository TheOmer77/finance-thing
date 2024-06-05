'use client';

import { DataTable } from '@/components/layout/DataTable';
import { LoadingState } from '@/components/layout/LoadingState';
import { AccountDrawer } from '@/app/(dashboard)/accounts/_components/drawer';
import { CategoryDrawer } from '@/app/(dashboard)/categories/_components/drawer';
import { useTransactions } from '@/hooks/transactions';

import { columns } from './columns';

export const TransactionsTable = () => {
  const {
    transactions,
    transactionsLoading,
    deleteTransactions,
    deleteTransactionsPending,
  } = useTransactions();

  const disabled = transactionsLoading || deleteTransactionsPending;

  if (transactionsLoading) return <LoadingState variant='table' />;

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

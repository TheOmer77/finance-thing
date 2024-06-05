'use client';

import { DataTable } from '@/components/layout/DataTable';
import { LoadingState } from '@/components/layout/LoadingState';
import { useAccounts } from '@/hooks/accounts';

import { columns } from './columns';

export const AccountsTable = () => {
  const { accounts, accountsLoading, deleteAccounts, deleteAccountsPending } =
    useAccounts();

  const disabled = accountsLoading || deleteAccountsPending;

  if (accountsLoading) return <LoadingState variant='table' />;

  return (
    <DataTable
      columns={columns}
      data={accounts || []}
      filterKey='name'
      itemTypeSingle='account'
      onDelete={rows => {
        const ids = rows.map(({ original }) => original.id);
        deleteAccounts({ ids });
      }}
      disabled={disabled}
      className='p-6 pt-0'
    />
  );
};

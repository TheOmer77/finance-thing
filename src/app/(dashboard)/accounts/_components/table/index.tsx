'use client';

import { Loader2Icon } from 'lucide-react';

import { CardContent } from '@/components/ui/Card';
import { DataTable } from '@/components/layout/DataTable';
import { useAccounts } from '@/hooks/accounts';

import { columns } from './columns';

export const AccountsTable = () => {
  const { accounts, accountsLoading, deleteAccounts, deleteAccountsPending } =
    useAccounts();

  const disabled = accountsLoading || deleteAccountsPending;

  if (accountsLoading)
    return (
      <CardContent className='grid h-[32rem] w-full place-items-center'>
        <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
      </CardContent>
    );

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

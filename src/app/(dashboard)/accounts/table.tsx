'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { InferResponseType } from 'hono';
import { Loader2Icon } from 'lucide-react';

import { CardContent } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  DataTable,
  DataTableColumnHeader,
} from '@/components/layout/DataTable';
import { useAccounts } from '@/hooks/useAccounts';
import { client } from '@/lib/hono';

import { AccountActions } from './actions';

export type AccountData = InferResponseType<
  typeof client.api.accounts.$get
>['data'][number];

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <AccountActions id={row.original.id} />,
  },
] satisfies ColumnDef<AccountData>[];

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
      itemType='account'
      onDelete={rows => {
        const ids = rows.map(({ original }) => original.id);
        deleteAccounts({ ids });
      }}
      disabled={disabled}
      className='p-6 pt-0'
    />
  );
};

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
import { useTransactions } from '@/hooks/useTransactions';
import { client } from '@/lib/hono';

import { TransactionActions } from './actions';

// TEMPORARY - Remove when actually implemented
const TEMP_NOT_IMPLEMENTED_YET = true;

export type TransactionData = InferResponseType<
  typeof client.api.transactions.$get
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
    cell: ({ row }) => <TransactionActions id={row.original.id} />,
  },
] satisfies ColumnDef<TransactionData>[];

export const TransactionsTable = () => {
  const {
    transactions,
    transactionsLoading,
    deleteTransactions,
    deleteTransactionsPending,
  } = useTransactions();

  const disabled = transactionsLoading || deleteTransactionsPending;

  if (transactionsLoading)
    return (
      <CardContent className='grid h-[32rem] w-full place-items-center'>
        <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
      </CardContent>
    );

  // TEMPORARY - Remove when actually implemented
  if (TEMP_NOT_IMPLEMENTED_YET)
    return (
      <CardContent className='text-sm text-muted-foreground'>
        Table not implemented yet. You can still add a new transaction using the
        button above.
      </CardContent>
    );

  return (
    <DataTable
      columns={columns}
      data={transactions || []}
      filterKey='name'
      itemTypeSingle='transaction'
      onDelete={rows => {
        const ids = rows.map(({ original }) => original.id);
        deleteTransactions({ ids });
      }}
      disabled={disabled}
      className='p-6 pt-0'
    />
  );
};

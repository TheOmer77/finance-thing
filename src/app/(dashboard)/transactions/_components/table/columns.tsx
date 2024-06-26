import { format } from 'date-fns';
import type { ColumnDef } from '@tanstack/react-table';
import type { InferResponseType } from 'hono';

import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import { DataTableColumnHeader } from '@/components/layout/DataTable';
import { amountFromMilliunits } from '@/lib/amount';
import { formatCurrency } from '@/lib/formatters';
import type { client } from '@/lib/hono';

import { TransactionLinkCell } from './link-cell';
import { TransactionActions } from './actions';

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
    accessorKey: 'payee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payee' />
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return (
        <Badge
          variant={amount < 0 ? 'destructive' : 'primary'}
          className='px-3.5 py-2.5 font-medium'
        >
          {formatCurrency(amountFromMilliunits(amount))}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => format(row.getValue('date'), 'PPP'),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <TransactionLinkCell
        type='category'
        name={row.original.category}
        id={row.original.categoryId}
      />
    ),
  },
  {
    accessorKey: 'account',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => (
      <TransactionLinkCell
        type='account'
        name={row.original.account}
        id={row.original.accountId}
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <TransactionActions id={row.original.id} />,
  },
] satisfies ColumnDef<TransactionData>[];

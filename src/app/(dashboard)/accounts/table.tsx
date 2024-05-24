'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/Checkbox';
import {
  DataTable,
  DataTableColumnHeader,
} from '@/components/layout/DataTable';

// This type is used to define the shape of our data.
// TODO: Replace this with the actual data type
export type DummyData = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

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
  { accessorKey: 'status', header: 'Status' },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
  },
  { accessorKey: 'amount', header: 'Amount' },
] satisfies ColumnDef<DummyData>[];

const DUMMY_DATA: DummyData[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '897fe9a7',
    amount: 200,
    status: 'success',
    email: 'a@example.com',
  },
];

export const AccountsTable = () => {
  return (
    <DataTable
      columns={columns}
      data={DUMMY_DATA}
      filterKey='email'
      onDelete={rows => console.log(rows)}
      className='px-4'
    />
  );
};

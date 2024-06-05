import type { ColumnDef } from '@tanstack/react-table';
import type { InferResponseType } from 'hono';

import { Checkbox } from '@/components/ui/Checkbox';
import { DataTableColumnHeader } from '@/components/layout/DataTable';
import type { client } from '@/lib/hono';

import { CategoryActions } from './actions';

export type CategoryData = InferResponseType<
  typeof client.api.categories.$get
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
    cell: ({ row }) => <CategoryActions id={row.original.id} />,
  },
] satisfies ColumnDef<CategoryData>[];

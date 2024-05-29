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
import { useCategories } from '@/hooks/useCategories';
import { client } from '@/lib/hono';

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

export const CategoriesTable = () => {
  const {
    categories,
    categoriesLoading,
    deleteCategories,
    deleteCategoriesPending,
  } = useCategories();

  const disabled = categoriesLoading || deleteCategoriesPending;

  if (categoriesLoading)
    return (
      <CardContent className='grid h-[32rem] w-full place-items-center'>
        <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
      </CardContent>
    );

  return (
    <DataTable
      columns={columns}
      data={categories || []}
      filterKey='name'
      itemType='category'
      onDelete={rows => {
        const ids = rows.map(({ original }) => original.id);
        deleteCategories({ ids });
      }}
      disabled={disabled}
      className='p-6 pt-0'
    />
  );
};

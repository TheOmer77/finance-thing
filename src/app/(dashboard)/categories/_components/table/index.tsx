'use client';

import { Loader2Icon } from 'lucide-react';

import { CardContent } from '@/components/ui/Card';
import { DataTable } from '@/components/layout/DataTable';
import { useCategories } from '@/hooks/categories';

import { columns } from './columns';

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
      itemTypeSingle='category'
      itemTypeMultiple='categories'
      onDelete={rows => {
        const ids = rows.map(({ original }) => original.id);
        deleteCategories({ ids });
      }}
      disabled={disabled}
      className='p-6 pt-0'
    />
  );
};

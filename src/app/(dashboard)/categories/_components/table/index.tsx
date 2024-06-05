'use client';

import { DataTable } from '@/components/layout/DataTable';
import { LoadingState } from '@/components/layout/LoadingState';
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

  if (categoriesLoading) return <LoadingState variant='table' />;

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

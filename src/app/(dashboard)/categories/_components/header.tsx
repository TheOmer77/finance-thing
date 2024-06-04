'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/hooks/useModal';
import { useCategories } from '@/hooks/useCategories';

export const CategoriesHeader = () => {
  const { openModal } = useModal();
  const { categoriesLoading } = useCategories();

  return (
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      {categoriesLoading ? (
        <Skeleton className='h-8 w-48' />
      ) : (
        <CardTitle>Categories</CardTitle>
      )}
      {!categoriesLoading && (
        <Button
          className='w-10 px-0 sm:w-auto sm:px-4'
          onClick={() => openModal('categories-new')}
        >
          <PlusIcon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>Add new</span>
        </Button>
      )}
    </CardHeader>
  );
};

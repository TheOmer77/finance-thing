'use client';

import { Loader2Icon, XIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/Drawer';
import { useCategories } from '@/hooks/useCategories';
import { useCategoryById } from '@/hooks/useCategoryById';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';

import { CategoryForm, type CategoryFormProps } from './form';

export const CategoryDrawer = () => {
  const matchesMd = useMediaQuery('(min-width: 768px)');
  const { currentModal, lastModal, closeModal } = useModal();
  const { createCategory, createCategoryPending } = useCategories();
  const [DeleteDialog, confirmDelete, deleteConfirmPending] = useConfirm({
    message: `Delete this category?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const isCurrentModal =
    currentModal === 'categories-new' ||
    !!currentModal?.startsWith('categories-edit-');
  const lastModalWasEdit = !!lastModal?.startsWith('categories-edit-');

  const currentCategoryId =
    (currentModal?.startsWith('categories-edit-') &&
      currentModal.split('-')[2]) ||
    undefined;
  const {
    category: currentCategory,
    categoryFetching: currentCategoryFetching,
    updateCategory,
    updateCategoryPending,
    deleteCategory,
    deleteCategoryPending,
  } = useCategoryById(currentCategoryId);

  const isPending =
    createCategoryPending || updateCategoryPending || deleteCategoryPending;

  const defaultValues = {
    name: (!currentCategoryFetching && currentCategory?.name) || '',
  };

  const handleOpenChange = (open: boolean) => {
    if (
      !open &&
      isCurrentModal &&
      !deleteConfirmPending &&
      !deleteCategoryPending
    )
      closeModal();
  };

  const handleSubmit: CategoryFormProps['onSubmit'] = values => {
    if (currentCategoryId)
      return updateCategory(values, { onSuccess: () => closeModal() });
    createCategory(values, { onSuccess: () => closeModal() });
  };

  const handleDelete = async () => {
    if (!currentCategoryId) return;
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteCategory(undefined, { onSuccess: () => closeModal() });
  };

  return (
    <>
      <Drawer
        open={isCurrentModal && !deleteConfirmPending && !deleteCategoryPending}
        onOpenChange={handleOpenChange}
        direction={matchesMd ? 'right' : 'bottom'}
      >
        <DrawerContent className='w-96 space-y-4'>
          <DrawerClose asChild>
            <Button variant='flat' size='icon' className='absolute end-2 top-0'>
              <XIcon className='size-4' />
            </Button>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>
              {lastModalWasEdit ? 'Edit category' : 'New category'}
            </DrawerTitle>
            <DrawerDescription>
              {lastModalWasEdit
                ? 'Edit this existing category.'
                : 'Create a new category to track your transactions.'}
            </DrawerDescription>
          </DrawerHeader>
          {currentCategoryFetching ? (
            <div className='grid h-16 w-full place-items-center'>
              <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
            </div>
          ) : (
            <CategoryForm
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              disabled={isPending}
              defaultValues={defaultValues}
              id={currentCategoryId}
            />
          )}
        </DrawerContent>
      </Drawer>
      <DeleteDialog />
    </>
  );
};

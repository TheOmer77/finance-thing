'use client';

import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useCategoryById } from '@/hooks/useCategoryById';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';

type CategoryActionsProps = {
  id: string;
};

export const CategoryActions = ({ id }: CategoryActionsProps) => {
  const { openModal } = useModal();
  const { deleteCategory, deleteCategoryPending } = useCategoryById(id, {
    enabled: false,
  });
  const [DeleteDialog, confirmDelete] = useConfirm({
    message: `Delete this category?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const handleEdit = () => openModal(`categories-edit-${id}`);

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteCategory();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='flat' size='icon' disabled={deleteCategoryPending}>
            <EllipsisVerticalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={handleEdit}
            disabled={deleteCategoryPending}
          >
            <PencilIcon className='me-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={deleteCategoryPending}
          >
            <TrashIcon className='me-2 size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog />
    </>
  );
};

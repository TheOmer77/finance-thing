'use client';

import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useAccountById } from '@/hooks/useAccountById';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';

type AccountActionsProps = {
  id: string;
};

export const AccountActions = ({ id }: AccountActionsProps) => {
  const { openModal } = useModal();
  const { deleteAccount, deleteAccountPending } = useAccountById(id, {
    enabled: false,
  });
  const [DeleteDialog, confirmDelete] = useConfirm({
    message: `Delete this account?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const handleEdit = () => openModal(`accounts-edit-${id}`);

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteAccount();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='flat' size='icon' disabled={deleteAccountPending}>
            <EllipsisVerticalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={handleEdit}
            disabled={deleteAccountPending}
          >
            <PencilIcon className='me-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={deleteAccountPending}
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

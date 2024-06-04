'use client';

import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useTransactionById } from '@/hooks/transactions';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';

type TransactionActionsProps = {
  id: string;
};

export const TransactionActions = ({ id }: TransactionActionsProps) => {
  const { openModal } = useModal();
  const { deleteTransaction, deleteTransactionPending } = useTransactionById(
    id,
    { enabled: false }
  );
  const [DeleteDialog, confirmDelete] = useConfirm({
    message: `Delete this transaction?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const handleEdit = () => openModal(`transactions-edit-${id}`);

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteTransaction();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='flat'
            size='icon'
            disabled={deleteTransactionPending}
          >
            <EllipsisVerticalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={handleEdit}
            disabled={deleteTransactionPending}
          >
            <PencilIcon className='me-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={deleteTransactionPending}
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

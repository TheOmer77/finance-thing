'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useModal } from '@/hooks/useModal';
import { EllipsisVerticalIcon, PencilIcon } from 'lucide-react';

type AccountActionsProps = {
  id: string;
};

export const AccountActions = ({ id }: AccountActionsProps) => {
  const { openModal } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='flat' size='icon'>
          <EllipsisVerticalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => openModal(`accounts-edit-${id}`)}>
          <PencilIcon className='me-2 size-4' />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

'use client';

import { Button } from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { TriangleAlertIcon } from 'lucide-react';

export type TransactionLinkCellProps =
  | {
      type: 'account';
      name: string;
      id: string;
    }
  | {
      type: 'category';
      name: string | null;
      id: string | null;
    };

export const TransactionLinkCell = ({
  type,
  name,
  id,
}: TransactionLinkCellProps) => {
  const { openModal } = useModal();

  const handleClick = () => {
    if (id)
      openModal(
        type === 'account' ? `accounts-edit-${id}` : `categories-edit-${id}`
      );
  };

  // For accounts, this should never happen
  if (!id)
    return (
      <span
        className={cn(
          type === 'account'
            ? 'flex flex-row items-center text-destructive'
            : 'text-muted-foreground'
        )}
      >
        {type === 'account' ? (
          <>
            <TriangleAlertIcon className='me-1.5 size-4' />
            {`Invalid ${type}`}
          </>
        ) : (
          'Uncategorized'
        )}
      </span>
    );

  return (
    <Button
      variant='link'
      className='p-0 text-foreground hover:text-foreground'
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

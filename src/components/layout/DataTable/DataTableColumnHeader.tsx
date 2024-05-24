import type { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <div className={cn(className)}>{title}</div>;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='flat'
        size='sm'
        className='-ml-3 h-8 data-[state=open]:bg-accent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className='ms-2 size-4' />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className='ms-2 size-4' />
        ) : (
          <ArrowUpDownIcon className='ms-2 size-4' />
        )}
      </Button>
    </div>
  );
}

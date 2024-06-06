import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { TableHead } from '@/components/ui/Table';
import { useTransactionsImport } from '@/hooks/transactions';
import { cn } from '@/lib/utils';

import { FIELDS } from './constants';

export type TableHeadSelectProps = {
  columnIndex: number;
  onChange: (columnIndex: number, value: string | null) => void;
};

export const TableHeadSelect = ({
  columnIndex,
  onChange,
}: TableHeadSelectProps) => {
  const { selectedColumns } = useTransactionsImport();
  const currentSelection = selectedColumns[`column-${columnIndex}`];

  return (
    <TableHead>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='flat'
            size='sm'
            className={cn(
              '-ms-3 h-8 capitalize data-[state=open]:bg-accent',
              currentSelection && 'text-primary hover:text-primary'
            )}
          >
            {currentSelection || 'skip'}
            <ChevronDownIcon className='ms-2 size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuRadioGroup
            value={currentSelection || 'skip'}
            onValueChange={value => onChange(columnIndex, value)}
          >
            <DropdownMenuRadioItem value='skip'>Skip</DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            {FIELDS.map(field => {
              const disabled =
                Object.values(selectedColumns).includes(field) &&
                currentSelection !== field;
              return (
                <DropdownMenuRadioItem
                  key={field}
                  value={field}
                  disabled={disabled}
                  className='capitalize'
                >
                  {field}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
};

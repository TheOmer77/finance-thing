import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => (
  <div className='flex items-center justify-between px-2 py-4'>
    <div className='flex-1 text-sm text-muted-foreground'>
      {`${table.getFilteredSelectedRowModel().rows.length} of ${
        table.getFilteredRowModel().rows.length
      } row(s) selected.`}
    </div>
    <div className='flex items-center space-x-6 lg:space-x-8'>
      <div
        className='hidden items-center justify-center text-sm font-medium
sm:flex'
      >
        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='size-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='size-4' />
        </Button>
      </div>
    </div>
  </div>
);

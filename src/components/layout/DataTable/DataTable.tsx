'use client';

import { useState, type ComponentPropsWithoutRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
} from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useConfirm } from '@/hooks/useConfirm';

import { DataTablePagination } from './DataTablePagination';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  itemTypeSingle?: string;
  itemTypeMultiple?: string;
  onDelete?: (rows: Row<TData>[]) => void;
  disabled?: boolean;
} & Pick<ComponentPropsWithoutRef<'div'>, 'className' | 'style'>;

export const DataTable = <TData, TValue>({
  columns,
  data,
  filterKey,
  itemTypeSingle = 'item',
  itemTypeMultiple,
  onDelete,
  disabled,
  className,
  style,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, rowSelection },
  });
  const { rows } = table.getFilteredSelectedRowModel();

  const [DeleteDialog, confirmDelete] = useConfirm({
    message:
      rows.length === 1
        ? `Delete this ${itemTypeSingle}?`
        : `Delete ${rows.length} ${itemTypeMultiple || `${itemTypeSingle}s`}?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    onDelete?.(rows);
    table.resetRowSelection();
  };

  return (
    <div className={className} style={style}>
      <div className='flex items-center gap-2 pb-4'>
        <Input
          placeholder={`Filter by ${filterKey}...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        {onDelete && rows.length > 0 && (
          <Button
            variant='outline'
            className='ms-auto'
            disabled={disabled}
            onClick={handleDelete}
          >
            <TrashIcon className='me-2 size-4' />
            {`Delete (${rows.length})`}
          </Button>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <DeleteDialog />
    </div>
  );
};

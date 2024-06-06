import { CardContent } from '@/components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useTransactionsImport } from '@/hooks/transactions';

import {
  TableHeadSelect,
  type TableHeadSelectProps,
} from './table-head-select';

export const TransactionsImportTable = () => {
  const { importResult, selectedColumns, setSelectedColumns } =
    useTransactionsImport();
  const [headers, ...body] = importResult.data;

  const handleColumnSelectChange: TableHeadSelectProps['onChange'] = (
    columnIndex,
    value
  ) =>
    setSelectedColumns(prev => {
      const newSelectedColumns = { ...prev };

      Object.keys(selectedColumns).forEach(key => {
        if (newSelectedColumns[key] === value) newSelectedColumns[key] = null;
      });
      newSelectedColumns[`column-${columnIndex}`] =
        value === 'skip' ? null : value;

      return newSelectedColumns;
    });

  return (
    <CardContent>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, colIndex) => (
                <TableHeadSelect
                  key={`header-${colIndex}`}
                  onChange={handleColumnSelectChange}
                  columnIndex={colIndex}
                  selectedColumns={selectedColumns}
                />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {body.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {headers.map((_, colIndex) => (
                  <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                    {row[colIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  );
};

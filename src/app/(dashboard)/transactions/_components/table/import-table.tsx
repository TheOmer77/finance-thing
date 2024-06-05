import { useState } from 'react';

import { CardContent } from '@/components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useTransactionsImport } from '@/hooks/transactions';

const INPUT_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss',
  OUTPUT_DATE_FORMAT = 'yyyy-MM-dd';
const REQUIRED_FIELDS = ['amount', 'date', 'payee'];

export const TransactionsImportTable = () => {
  const { importResult } = useTransactionsImport();
  const [headers, ...body] = importResult.data;

  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, string | null>
  >({});

  const handleColumnSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {};

  return (
    <CardContent>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, colIndex) => (
                <TableHead key={`header-${colIndex}`}>{header}</TableHead>
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

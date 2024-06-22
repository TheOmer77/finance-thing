import { format } from 'date-fns';
import type { TooltipProps } from 'recharts';

import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';

import type { TransactionsDaysData } from './types';

const ChartTooltipLine = ({
  type,
  value,
}: {
  type: 'income' | 'expenses';
  value: number;
}) => (
  <li className='flex flex-row items-center text-sm'>
    <div
      className={cn(
        'me-2 size-1.5 rounded-full',
        type === 'expenses' ? 'bg-destructive' : 'bg-primary'
      )}
    />
    <span className='me-3 text-muted-foreground'>
      {type === 'expenses' ? 'Expenses' : 'Income'}
    </span>
    <span className='ms-auto'>{formatCurrency(value)}</span>
  </li>
);

type ChartTooltipProps = TooltipProps<
  number,
  keyof Omit<TransactionsDaysData[number], 'date'>
>;

export const ChartTooltip = ({ active, payload }: ChartTooltipProps) => {
  if (!active || !payload) return null;

  const date = payload[0].payload.date as string,
    income = payload[0].value || 0,
    expenses = payload[1].value || 0;

  return (
    <div className='rounded-md border bg-popover px-3 py-2 shadow-sm [.recharts-tooltip-wrapper:has(&)]:!transition-none'>
      <p className='pb-1 font-medium'>{format(date, 'PPP')}</p>
      <ul>
        <ChartTooltipLine type='income' value={income} />
        <ChartTooltipLine type='expenses' value={expenses * -1} />
      </ul>
    </div>
  );
};

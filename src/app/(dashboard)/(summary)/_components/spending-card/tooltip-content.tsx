import type { TooltipProps } from 'recharts';

import { formatCurrency } from '@/lib/formatters';

import type { SpendingCategoriesData } from './types';

type TooltipContentProps = TooltipProps<
  SpendingCategoriesData[number]['value'],
  SpendingCategoriesData[number]['name']
>;

export const TooltipContent = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload) return null;

  const { name, value } = payload[0];
  if (!name || !value) return null;

  return (
    <div className='rounded-md border bg-popover px-3 py-2 shadow-sm [.recharts-tooltip-wrapper:has(&)]:!transition-none'>
      <p className='pb-1 font-medium'>{name}</p>
      <ul>
        <li className='flex flex-row items-center text-sm'>
          <div className='me-2 size-1.5 rounded-full bg-destructive' />
          <span className='me-3 text-muted-foreground'>Expenses</span>
          <span className='ms-auto'>{formatCurrency(value * 1)}</span>
        </li>
      </ul>
    </div>
  );
};

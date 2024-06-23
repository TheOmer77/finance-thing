import { formatCurrency, formatPercentage } from '@/lib/formatters';
import type { DefaultLegendContentProps } from 'recharts';

type LegendContentProps = DefaultLegendContentProps & {
  valueType: 'percent' | 'amount';
};

export const LegendContent = ({ valueType, payload }: LegendContentProps) => {
  if (!payload) return null;
  return (
    <ul className='flex flex-col gap-2'>
      {payload.map(({ value, color, payload }, index) => {
        const percent =
            payload &&
            'percent' in payload &&
            typeof payload.percent === 'number'
              ? formatPercentage(payload.percent * 100)
              : undefined,
          amount =
            payload && typeof payload.value === 'number'
              ? formatCurrency(payload.value)
              : undefined;
        const displayedValue = valueType === 'percent' ? percent : amount;

        return (
          <li
            key={`legend-${index}`}
            className='inline-flex flex-row items-center'
          >
            <span
              className='me-2 size-2 rounded-full'
              style={{ backgroundColor: color }}
            />
            <div className='space-x-1 text-sm'>
              <span className='text-muted-foreground'>{value}</span>
              {displayedValue && <span>{displayedValue}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

import {
  Area,
  AreaChart as Chart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { format } from 'date-fns';

import type { ChartProps } from './types';
import { ChartTooltip } from './chart-tooltip';

export const AreaChart = ({ data }: ChartProps) => {
  const absData = data.map(item => ({
    ...item,
    income: Math.abs(item.income),
    expenses: Math.abs(item.expenses),
  }));

  return (
    <ResponsiveContainer className='!h-[22rem]'>
      <Chart data={absData}>
        <CartesianGrid
          strokeDasharray='3 3'
          className='stroke-muted-foreground'
        />
        <defs>
          <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='2%'
              stopColor='hsl(var(--primary))'
              stopOpacity={0.8}
            />
            <stop
              offset='98%'
              stopColor='hsl(var(--primary))'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id='expenses' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='2%'
              stopColor='hsl(var(--destructive))'
              stopOpacity={0.8}
            />
            <stop
              offset='98%'
              stopColor='hsl(var(--destructive))'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey='date'
          tickFormatter={value => format(value, 'MMM dd')}
          tickMargin={16}
          className='text-xs'
        />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type='monotone'
          dataKey='income'
          stackId='income'
          stroke='hsl(var(--primary))'
          fill='url(#income)'
          className='!stroke-2 drop-shadow-sm'
        />
        <Area
          type='monotone'
          dataKey='expenses'
          stackId='expenses'
          stroke='hsl(var(--destructive))'
          fill='url(#expenses)'
          className='!stroke-2 drop-shadow-sm'
        />
      </Chart>
    </ResponsiveContainer>
  );
};

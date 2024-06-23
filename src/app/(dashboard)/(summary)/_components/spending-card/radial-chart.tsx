import {
  Legend,
  RadialBar,
  RadialBarChart as Chart,
  ResponsiveContainer,
  type DefaultLegendContentProps,
} from 'recharts';

import type { SpendingChartProps } from './types';
import { formatCurrency } from '@/lib/formatters';

const COLORS = [...Array(4).keys()].map(
  index => `hsl(var(--color-pie-${index + 1}))`
);

export const LegendContent = ({ payload }: DefaultLegendContentProps) => {
  if (!payload) return null;
  return (
    <ul className='flex flex-col gap-2'>
      {payload.map(({ value, color, payload }, index) => {
        const amount =
          payload && typeof payload.value === 'number'
            ? formatCurrency(payload.value)
            : undefined;
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
              {amount && <span>{amount}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const RadialChart = ({ data }: SpendingChartProps) => (
  <ResponsiveContainer className='!h-[22rem]'>
    <Chart
      cx='50%'
      cy='30%'
      barSize={12}
      innerRadius='90%'
      outerRadius='40%'
      data={data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }))}
    >
      <Legend content={LegendContent} />

      <RadialBar dataKey='value' background />
    </Chart>
  </ResponsiveContainer>
);

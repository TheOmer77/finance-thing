import {
  Cell,
  PieChart as Chart,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
  type DefaultLegendContentProps,
} from 'recharts';

import { LegendContent } from './legend-content';
import { TooltipContent } from './tooltip-content';
import type { SpendingChartProps } from './types';

const PieLegendContent = (props: DefaultLegendContentProps) => (
  <LegendContent valueType='percent' {...props} />
);

const COLORS = [...Array(4).keys()].map(
  index => `hsl(var(--color-pie-${index + 1}))`
);

export const PieChart = ({ data }: SpendingChartProps) => (
  <ResponsiveContainer className='!h-[22rem]'>
    <Chart>
      <Legend content={PieLegendContent} />
      <Tooltip content={TooltipContent} />

      <Pie
        data={data}
        cx='50%'
        cy='50%'
        outerRadius={90}
        innerRadius={60}
        paddingAngle={2}
        dataKey='value'
        labelLine={false}
      >
        {[...Array(data.length).keys()].map(index => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </Chart>
  </ResponsiveContainer>
);

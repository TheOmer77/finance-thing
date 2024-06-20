import {
  AreaChartIcon,
  BarChart3Icon,
  ChevronDownIcon,
  LineChartIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import type { ChartType } from './types';

const chartOptions = [
  { label: 'Area chart', value: 'area' },
  { label: 'Bar chart', value: 'bar' },
  { label: 'Line chart', value: 'line' },
] satisfies { label: string; value: ChartType }[];

const getTypeIcon = (value: ChartType) => {
  switch (value) {
    case 'area':
      return AreaChartIcon;
    case 'bar':
      return BarChart3Icon;
    case 'line':
      return LineChartIcon;
  }
};

type ChartTypeSelectProps = {
  value: ChartType;
  onValueChange: (value: ChartType) => void;
};

export const ChartTypeSelect = ({
  value,
  onValueChange,
}: ChartTypeSelectProps) => {
  const Icon = getTypeIcon(value);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Icon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>
            {chartOptions.find(option => option.value === value)?.label}
          </span>
          <ChevronDownIcon className='ms-2 size-4 text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[--radix-dropdown-menu-trigger-width]'
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={value => onValueChange(value as ChartType)}
        >
          {chartOptions.map(({ label, value }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import {
  ChevronDownIcon,
  PieChartIcon,
  RadarIcon,
  TargetIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import type { SpendingChartType } from './types';

const chartOptions = [
  { label: 'Pie chart', value: 'pie' },
  { label: 'Radar chart', value: 'radar' },
  { label: 'Radial chart', value: 'radial' },
] satisfies { label: string; value: SpendingChartType }[];

const getTypeIcon = (value: SpendingChartType) => {
  switch (value) {
    case 'pie':
      return PieChartIcon;
    case 'radar':
      return RadarIcon;
    case 'radial':
      return TargetIcon;
  }
};

type ChartTypeSelectProps = {
  value: SpendingChartType;
  onValueChange: (value: SpendingChartType) => void;
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
          onValueChange={value => onValueChange(value as SpendingChartType)}
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

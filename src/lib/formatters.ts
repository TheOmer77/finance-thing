import { format, isSameDay, isSameYear, subDays } from 'date-fns';

type Period = { from?: string | Date; to?: string | Date };

const DATE_FORMAT_NO_YEAR = 'LLL dd',
  DATE_FORMAT_WITH_YEAR = 'LLL dd, y';

export const formatDateRange = (period: Period) => {
  const to = period.to || new Date(),
    from = period.from || subDays(to, 30);

  if (isSameDay(from, to)) return format(from, DATE_FORMAT_WITH_YEAR);
  if (isSameYear(from, to))
    return `${format(from, DATE_FORMAT_NO_YEAR)} - ${format(to, DATE_FORMAT_WITH_YEAR)}`;
  return `${format(from, DATE_FORMAT_WITH_YEAR)} - ${format(to, DATE_FORMAT_WITH_YEAR)}`;
};

export const formatCurrency = (amount: number) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);

export const formatPercentage = (value: number, { addPrefix = false } = {}) =>
  `${addPrefix && value > 0 ? '+' : ''}${Intl.NumberFormat('en-US', {
    style: 'percent',
  }).format(value / 100)}`;

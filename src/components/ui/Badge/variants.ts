import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
transition-colors focus:outline-none focus:ring-2 focus:ring-ring
focus:ring-offset-2`,
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground',
        primary: 'bg-primary/10 text-primary',
        destructive: 'bg-destructive/10 text-destructive',
        outline: 'border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

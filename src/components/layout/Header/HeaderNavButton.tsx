import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type HeaderNavButtonProps = {
  href: `/${string}`;
  label: string;
  active?: boolean;
};

export const HeaderNavButton = ({
  active,
  href,
  label,
}: HeaderNavButtonProps) => (
  <Button
    variant='ghost'
    className={cn(
      'text-inherit hover:bg-primary-foreground/25 hover:text-inherit',
      active && 'bg-primary-foreground/15'
    )}
    asChild
  >
    <Link href={href}>{label}</Link>
  </Button>
);

'use client';

import { usePathname } from 'next/navigation';

import { HeaderNavButton, type HeaderNavButtonProps } from './HeaderNavButton';

const routes = [
  { href: '/', label: 'Overview' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/categories', label: 'Categories' },
  { href: '/settings', label: 'Settings' },
] satisfies Omit<HeaderNavButtonProps, 'active'>[];

export const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <nav className='hidden flex-row items-center gap-px overflow-x-auto lg:flex'>
      {routes.map(({ href, label }) => (
        <HeaderNavButton
          key={href}
          href={href}
          label={label}
          active={pathname === href}
        />
      ))}
    </nav>
  );
};

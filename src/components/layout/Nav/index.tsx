'use client';

import { usePathname } from 'next/navigation';

import { DrawerClose } from '@/components/ui/Drawer';
import { navRoutes } from '@/constants/nav';

import { NavButton } from './NavButton';
import { NavDrawer } from './NavDrawer';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className='hidden flex-row items-center gap-px overflow-x-auto lg:flex'>
        {navRoutes.map(({ href, label }) => (
          <NavButton
            key={href}
            href={href}
            label={label}
            active={pathname === href}
          />
        ))}
      </nav>
      <NavDrawer>
        {navRoutes.map(({ href, label }) => (
          <DrawerClose key={href} asChild>
            <NavButton href={href} label={label} active={pathname === href} />
          </DrawerClose>
        ))}
      </NavDrawer>
    </>
  );
};

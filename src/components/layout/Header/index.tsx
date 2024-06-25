import { Nav } from '@/components/layout/Nav';
import { UserMenu } from '@/components/layout/UserMenu';

import { HeaderLogo } from './HeaderLogo';
import { HeaderWelcomeMsg } from './HeaderWelcomeMsg';
import { HeaderFilters } from './HeaderFilters';

export const Header = () => (
  <header className='h-64 w-full bg-background bg-gradient-to-b from-primary to-primary/80 text-primary-foreground lg:h-80 [&+*]:-mt-24 lg:[&+*]:-mt-28 [&>*]:mx-auto [&>*]:w-full [&>*]:max-w-screen-2xl [&>*]:px-4'>
    <div className='flex h-16 items-center justify-start gap-2 lg:flex-row lg:gap-8'>
      <HeaderLogo />
      <Nav />
      <UserMenu />
    </div>
    <HeaderWelcomeMsg />
    <HeaderFilters />
  </header>
);

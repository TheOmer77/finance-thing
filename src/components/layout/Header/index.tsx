import { HeaderLogo } from './HeaderLogo';
import { Nav } from '@/components/layout/Nav';
import { UserMenu } from '@/components/layout/UserMenu';

export const Header = () => (
  <header
    className='w-full bg-foreground bg-gradient-to-b from-primary to-primary/80
text-primary-foreground'
  >
    <div
      className='mx-auto flex w-full max-w-screen-2xl
items-center justify-start gap-2 p-4 lg:flex-row lg:gap-8 lg:pb-36'
    >
      <HeaderLogo />
      <Nav />
      <UserMenu />
    </div>
  </header>
);

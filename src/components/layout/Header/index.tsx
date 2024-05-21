import { HeaderLogo } from './HeaderLogo';
import { Nav } from '@/components/layout/Nav';

export const Header = () => (
  <header
    className='w-full bg-foreground bg-gradient-to-b from-primary to-primary/80
text-primary-foreground'
  >
    <div
      className='mx-auto flex w-full max-w-screen-2xl flex-row items-center
justify-between p-4 lg:pb-36'
    >
      <HeaderLogo />
      <Nav />
    </div>
  </header>
);

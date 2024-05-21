import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';

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
      <HeaderNav />
    </div>
  </header>
);

import Link from 'next/link';

import { Logo } from '../Logo';

export const HeaderLogo = () => (
  <Link href='/' className='flex select-none flex-row items-center gap-3'>
    <Logo className='fill-current' />
    <span className='hidden text-2xl font-bold tracking-tight lg:inline-block'>
      Finance Thing
    </span>
  </Link>
);

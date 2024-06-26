'use client';

import { useUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Spinner } from '@/components/ui/Spinner';

export const UserMenuTrigger = () => {
  const { isLoaded, user } = useUser();

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant='flat-nav'
        size='icon'
        className='rounded-full p-2'
        disabled={!isLoaded}
      >
        {!isLoaded || !user?.id ? (
          <Spinner className='size-7 text-inherit' />
        ) : (
          <Avatar className='size-9'>
            <AvatarImage
              alt={user?.primaryEmailAddress?.emailAddress || 'User'}
              src={user?.imageUrl}
            />
            <AvatarFallback>
              {user?.primaryEmailAddress?.emailAddress?.[0]}
            </AvatarFallback>
          </Avatar>
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};

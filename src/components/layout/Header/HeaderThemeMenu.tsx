'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsClient } from 'usehooks-ts';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

const THEMES = { system: 'System', light: 'Light', dark: 'Dark' } as const;

export const HeaderThemeMenu = () => {
  const { setTheme, theme } = useTheme();
  const isClient = useIsClient();

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>Theme</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant='flat'
              size='icon'
              disabled={!isClient}
              className='text-inherit hover:bg-primary-foreground/20 hover:text-inherit'
            >
              <DropdownMenuTrigger>
                <>
                  <MoonIcon className='hidden dark:block' />
                  <SunIcon className='dark:hidden' />
                </>
              </DropdownMenuTrigger>
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {Object.entries(THEMES).map(([value, displayName]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {displayName}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Link, useRouterState } from '@tanstack/react-router';
import {
  CircleQuestionMarkIcon,
  GripIcon,
  ListChecksIcon,
  MedalIcon,
  UsersIcon,
} from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { LanguageSwitcher } from '@/base/components/ui/language-switcher';
import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';
import { User } from '@/modules/users/types';
import authentication from '@/modules/LR/authentication';

interface HeaderProps {
  user: User | undefined;
}

// TODO: receive user prop and show user avatar and dropdown menu
export function Header(_: HeaderProps) {
  const currentPathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <header className='py-3 border-b-2 border-primary bg-white z-50'>
      <nav className='container mx-auto flex items-center w-full'>
        <Link to='/exercises' className='shrink-0'>
          <img src='/favicon.svg' alt='FPT University Online Judge' className='h-10 w-auto' />
        </Link>
        <div className='flex items-center justify-between grow mx-auto max-w-3xl'>
          <Link to='/exercises'>
            <Button
              variant='ghost'
              className={cn(
                'text-muted-foreground text-base hover:text-primary hover:bg-transparent',
                {
                  'text-primary': currentPathname.startsWith('/exercises'),
                }
              )}
            >
              <GripIcon className='size-5' />
              {getTranslation('base.layouts.Header.exercises')}
            </Button>
          </Link>
          <Link to='/submissions'>
            <Button
              variant='ghost'
              className={cn(
                'text-muted-foreground text-base hover:text-primary hover:bg-transparent',
                {
                  'text-primary': currentPathname.startsWith('/submissions'),
                }
              )}
            >
              <ListChecksIcon className='size-5' />
              {getTranslation('base.layouts.Header.submissions')}
            </Button>
          </Link>
          <Link to='/leaderboard'>
            <Button
              variant='ghost'
              className={cn(
                'text-muted-foreground text-base hover:text-primary hover:bg-transparent',
                {
                  'text-primary': currentPathname.startsWith('/leaderboard'),
                }
              )}
            >
              <MedalIcon className='size-5' />
              {getTranslation('base.layouts.Header.leaderboard')}
            </Button>
          </Link>
          <Link to='/groups'>
            <Button
              variant='ghost'
              className={cn(
                'text-muted-foreground text-base hover:text-primary hover:bg-transparent',
                {
                  'text-primary': currentPathname.startsWith('/groups'),
                }
              )}
            >
              <UsersIcon className='size-5' />
              {getTranslation('base.layouts.Header.groups')}
            </Button>
          </Link>
        </div>
        <div className='flex gap-4 items-center shrink-0'>
          <Button variant='outline' onClick={() => authentication.logout()}>
            <CircleQuestionMarkIcon />
            {getTranslation('base.layouts.Header.help')}
          </Button>
          <LanguageSwitcher />
          {/* TODO: replace this with UserActions */}
          <UserAvatarSkeleton />
        </div>
      </nav>
    </header>
  );
}

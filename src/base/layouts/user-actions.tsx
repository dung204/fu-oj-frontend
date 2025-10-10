import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { LogInIcon, LogOutIcon, UserCogIcon, UserPlusIcon } from 'lucide-react';

import { authService } from '@/modules/auth/services/auth.service';
import { UserAvatar } from '@/modules/users/components/user-avatar';
import { User } from '@/modules/users/types';

import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { LanguageSwitcher } from '../components/ui/language-switcher';
import { getTranslation } from '../utils';

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: UserActionsProps) {
  const { mutate: triggerLogout } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      window.location.pathname = '/auth/login';
    },
  });

  if (!user) {
    return (
      <>
        <Link to='/auth/register'>
          <Button variant='outline'>
            <UserPlusIcon />
            {getTranslation('base.layouts.UserActions.register')}
          </Button>
        </Link>
        <Link to='/auth/login'>
          <Button>
            <LogInIcon />
            {getTranslation('base.layouts.UserActions.login')}
          </Button>
        </Link>
        <LanguageSwitcher />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className='size-10 cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          <span className='font-normal'>{getTranslation('base.layouts.UserActions.signInAs')}</span>{' '}
          {!user.firstName || !user.lastName ? (
            <span className='text-error'>{getTranslation('base.layouts.UserActions.noName')}</span>
          ) : (
            <span className='font-medium'>{`${user.firstName} ${user.lastName}`}</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to='/profile'>
          <DropdownMenuItem>
            <UserCogIcon />
            {getTranslation('base.layouts.UserActions.updateProfile')}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem variant='error' onClick={() => triggerLogout()}>
          <LogOutIcon />
          {getTranslation('base.layouts.UserActions.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

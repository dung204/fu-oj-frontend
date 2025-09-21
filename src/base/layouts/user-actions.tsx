import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  LogInIcon,
  LogOutIcon,
  NotebookPenIcon,
  PlusIcon,
  UserCogIcon,
  UserPlusIcon,
} from 'lucide-react';

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
import { checkIsPrivateRoute, getTranslation } from '../utils';

interface UserActionsProps {
  user: User | undefined;
}

export function UserActions({ user }: UserActionsProps) {
  const { mutate: triggerLogout } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      if (checkIsPrivateRoute(window.location.pathname)) {
        window.location.pathname = '/';
        return;
      }

      window.location.reload();
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
    <>
      <Link to='/posts/new'>
        <Button>
          <PlusIcon />
          {getTranslation('base.layouts.UserActions.newPost')}
        </Button>
      </Link>
      <Link to='/posts/me'>
        <Button variant='outline'>
          <NotebookPenIcon />
          {getTranslation('base.layouts.UserActions.myPosts')}
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar user={user} className='size-10 cursor-pointer' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>
            <span className='font-normal'>
              {getTranslation('base.layouts.UserActions.signInAs')}
            </span>{' '}
            {!user.firstName || !user.lastName ? (
              <span className='text-error'>
                {getTranslation('base.layouts.UserActions.noName')}
              </span>
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
      <LanguageSwitcher />
    </>
  );
}

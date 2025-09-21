import { Link } from '@tanstack/react-router';

import { User } from '@/modules/users/types';

import { UserActions } from './user-actions';

interface HeaderProps {
  user: User | undefined;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className='flex items-center justify-between py-10'>
      <Link to='/'>
        <h1 className='font-bold text-5xl'>Blog</h1>
      </Link>
      <nav className='flex items-center gap-6'>
        <UserActions user={user} />
      </nav>
    </header>
  );
}

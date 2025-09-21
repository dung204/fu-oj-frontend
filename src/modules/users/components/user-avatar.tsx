import { UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/base/components/ui/avatar';
import { Skeleton } from '@/base/components/ui/skeleton';
import { cn } from '@/base/lib';

import { User } from '../types';

interface UserAvatarProps {
  user: User | undefined;
  src?: string;
  className?: string;
}

export function UserAvatar({ user, src, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={src ?? user?.avatar?.url}
        alt={`avatar-${user?.id}`}
        className='object-cover object-center'
      />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
}

export function UserAvatarSkeleton({ className }: Pick<UserAvatarProps, 'className'>) {
  return (
    <div className={cn('size-8 rounded-full overflow-none', className)}>
      <Skeleton className='size-full' />
    </div>
  );
}

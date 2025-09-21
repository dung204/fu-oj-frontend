import { EyeIcon, EyeOffIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
import { formatRelativeTime, getTranslation } from '@/base/utils';
import { getLocale } from '@/i18n/runtime';
import { UserAvatar } from '@/modules/users/components/user-avatar';

import { Post } from '../types';

interface PostCardProps {
  post: Post;
  showStatus?: boolean;
}

export function PostCard({ post, showStatus }: PostCardProps) {
  const locale = getLocale();

  return (
    <Card className='w-full cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1'>
      <CardHeader className='items-center'>
        <CardTitle>{post.title}</CardTitle>
        {showStatus && <CardAction>{getPostCardStatus(post)}</CardAction>}
      </CardHeader>
      <CardContent>
        <p className='line-clamp-1'>{post.content}</p>
      </CardContent>
      <CardFooter className='flex gap-2 justify-between items-center'>
        <div className='flex items-center gap-2'>
          <UserAvatar user={post.user} />
          <span>
            {getTranslation('modules.posts.components.PostCard.postedBy')}{' '}
            <span className='font-semibold'>
              {post.user.firstName} {post.user.lastName}
            </span>
          </span>
        </div>
        <span>
          {getTranslation('modules.posts.components.PostCard.postedAt')}{' '}
          {formatRelativeTime(new Date(post.createdTimestamp), locale)}
        </span>
      </CardFooter>
    </Card>
  );
}

export function getPostCardStatus(post: Post) {
  if (post.deletedTimestamp) {
    return (
      <Button variant='error' className='pointer-events-none'>
        <Trash2Icon />
        {getTranslation('modules.posts.components.PostCard.deleted')}
      </Button>
    );
  }

  if (post.isPublic) {
    return (
      <Button variant='success' className='pointer-events-none'>
        <EyeIcon />
        {getTranslation('modules.posts.components.PostCard.public')}
      </Button>
    );
  }

  return (
    <Button variant='warning' className='pointer-events-none'>
      <EyeOffIcon />
      {getTranslation('modules.posts.components.PostCard.private')}
    </Button>
  );
}

export function PostCardSkeleton({ showStatus }: Pick<PostCardProps, 'showStatus'>) {
  return (
    <Card className='w-full'>
      <CardHeader className='items-center'>
        <CardTitle>
          <Skeleton className='h-[1lh] w-1/3' />
        </CardTitle>
        {showStatus && (
          <CardAction>
            <Skeleton className='h-9 w-16' />
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <p className='line-clamp-1'>
          <Skeleton className='h-[1lh] w-full' />
        </p>
      </CardContent>
      <CardFooter className='flex gap-2 justify-between items-center'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full size-8 overflow-hidden'>
            <Skeleton className='size-full' />
          </div>
          <span>
            <Skeleton className='h-[1lh] w-24' />
          </span>
        </div>
        <span>
          <Skeleton className='h-[1lh] w-20' />
        </span>
      </CardFooter>
    </Card>
  );
}

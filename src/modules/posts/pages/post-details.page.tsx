import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { EditIcon, EyeIcon, EyeOffIcon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { BackButton } from '@/base/components/ui/back-button';
import { Button } from '@/base/components/ui/button';
import { Skeleton } from '@/base/components/ui/skeleton';
import { formatRelativeTime, getTranslation } from '@/base/utils';
import { getLocale } from '@/i18n/runtime';
import { UserAvatar, UserAvatarSkeleton } from '@/modules/users/components/user-avatar';
import { User } from '@/modules/users/types';

import { postsService } from '../services/posts.service';
import { UpdatePostSchema } from '../types';

interface PostDetailsPage {
  postId: string;
  user: User | undefined;
}

export function PostDetailsPage({ postId, user }: PostDetailsPage) {
  const locale = getLocale();
  const queryClient = useQueryClient();

  const {
    data: { data: post },
  } = useSuspenseQuery({
    queryKey: ['posts', { id: postId }],
    queryFn: () => postsService.getPostById(postId, !!user),
  });

  const { mutate: triggerUpdatePost, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdatePostSchema) => postsService.updatePost(postId, payload),
    onSuccess: (_, { isPublic }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (isPublic) {
        toast.success(
          getTranslation('modules.posts.pages.PostDetailsPage.setToPublicNotification')
        );
        return;
      }

      toast.success(getTranslation('modules.posts.pages.PostDetailsPage.setToPrivateNotification'));
    },
  });

  const { mutate: triggerDeletePost } = useMutation({
    mutationFn: () => postsService.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success(
        getTranslation('modules.posts.pages.PostDetailsPage.deleteSuccessNotification')
      );
    },
  });

  const { mutate: triggerRestorePost } = useMutation({
    mutationFn: () => postsService.restorePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success(
        getTranslation('modules.posts.pages.PostDetailsPage.restoreSuccessNotification')
      );
    },
  });

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between items-center'>
          <BackButton disabled={isUpdating} />
          {user?.id === post.user.id && (
            <div className='flex gap-4'>
              {post.isPublic ? (
                <Button
                  variant='warning'
                  disabled={!!post.deletedTimestamp || isUpdating}
                  onClick={() => triggerUpdatePost({ isPublic: false })}
                >
                  <EyeOffIcon />
                  {getTranslation('modules.posts.pages.PostDetailsPage.setToPrivate')}
                </Button>
              ) : (
                <Button
                  variant='success'
                  disabled={!!post.deletedTimestamp || isUpdating}
                  onClick={() => triggerUpdatePost({ isPublic: true })}
                >
                  <EyeIcon />
                  {getTranslation('modules.posts.pages.PostDetailsPage.setToPublic')}
                </Button>
              )}
              <Link
                to='/posts/$postId/edit'
                params={{ postId }}
                disabled={!!post.deletedTimestamp || isUpdating}
              >
                <Button disabled={!!post.deletedTimestamp || isUpdating}>
                  <EditIcon />
                  {getTranslation('modules.posts.pages.PostDetailsPage.editPost')}
                </Button>
              </Link>
              {post.deletedTimestamp ? (
                <Button
                  variant='success'
                  disabled={isUpdating}
                  onClick={() => triggerRestorePost()}
                >
                  <RotateCcwIcon />
                  {getTranslation('modules.posts.pages.PostDetailsPage.restorePost')}
                </Button>
              ) : (
                <Button variant='error' disabled={isUpdating} onClick={() => triggerDeletePost()}>
                  <Trash2Icon />
                  {getTranslation('modules.posts.pages.PostDetailsPage.deletePost')}
                </Button>
              )}
            </div>
          )}
        </div>
        <h2 className='font-medium text-xl'>{post.title}</h2>
        <div className='flex items-center gap-2'>
          <UserAvatar user={post.user} />
          <span>
            {getTranslation('modules.posts.pages.PostDetailsPage.postedBy')}{' '}
            <span className='font-medium'>
              {post.user.firstName} {post.user.lastName}
            </span>
          </span>
        </div>
        <div>
          {getTranslation('modules.posts.pages.PostDetailsPage.postedAt')}{' '}
          {formatRelativeTime(new Date(post.createdTimestamp), locale)}
        </div>
      </div>
      <div>{post.content}</div>
    </section>
  );
}

export function PostDetailsPageSkeleton() {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-3'>
        <BackButton />
        <h2 className='font-medium text-xl'>
          <Skeleton className='h-[1lh] w-1/2' />
        </h2>
        <div className='flex items-center gap-2'>
          <UserAvatarSkeleton />
          <span>
            <Skeleton className='h-[1lh] w-1/4' />
          </span>
        </div>
        <div>
          <Skeleton className='h-[1lh] w-1/6' />
        </div>
      </div>
      <div className='space-y-1.5'>
        <Skeleton className='h-[1lh] w-full' />
        <Skeleton className='h-[1lh] w-full' />
        <Skeleton className='h-[1lh] w-full' />
        <Skeleton className='h-[1lh] w-2/3' />
      </div>
    </section>
  );
}

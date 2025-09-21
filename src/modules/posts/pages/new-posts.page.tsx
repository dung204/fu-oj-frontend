import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { ComponentProps } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { BackButton } from '@/base/components/ui/back-button';
import { Button } from '@/base/components/ui/button';
import { getTranslation } from '@/base/utils';
import { User } from '@/modules/users/types';

import { PostForm } from '../components/post-form';
import { postsService } from '../services/posts.service';
import { CreatePostSchema } from '../types';

interface NewPostsPageProps {
  user: User;
}

export function NewPostsPage({ user }: NewPostsPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: triggerCreatePost, isPending: isCreating } = useMutation({
    mutationFn: (data: CreatePostSchema) => postsService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
      router.navigate({ to: '/posts/me', replace: true });
    },
  });

  return (
    <>
      <section className='space-y-8'>
        <div className='flex flex-col gap-3'>
          <BackButton disabled={isCreating} />
          <h2 className='font-medium text-xl'>
            {getTranslation('modules.posts.pages.NewPostPage.title')}
          </h2>
        </div>
        <PostForm
          loading={isCreating}
          renderSubmitButton={(Button) => (
            <Button>
              {getTranslation('modules.posts.pages.NewPostPage.postFormSubmitButtonLabel')}
            </Button>
          )}
          onSuccessSubmit={(data) => triggerCreatePost(data)}
        />
      </section>
      <CanNotCreatePostDialog open={!user.firstName || !user.lastName} />
    </>
  );
}

type CanNotCreatePostDialogProps = ComponentProps<typeof AlertDialog>;

export function CanNotCreatePostDialog(props: CanNotCreatePostDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {getTranslation('modules.posts.pages.NewPostPage.CanNotCreatePostDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {getTranslation('modules.posts.pages.NewPostPage.CanNotCreatePostDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link to='/'>
            <Button variant='outline'>
              {getTranslation(
                'modules.posts.pages.NewPostPage.CanNotCreatePostDialog.backToHomeButtonLabel'
              )}
            </Button>
          </Link>
          <Link to='/profile'>
            <Button>
              {getTranslation(
                'modules.posts.pages.NewPostPage.CanNotCreatePostDialog.goToUpdateProfileButtonLabel'
              )}
            </Button>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

import { BackButton } from '@/base/components/ui/back-button';
import { getTranslation } from '@/base/utils';

import { PostForm } from '../components/post-form';
import { postsService } from '../services/posts.service';
import { UpdatePostSchema } from '../types';

interface EditPostPageProps {
  postId: string;
}

export function EditPostPage({ postId }: EditPostPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: { data: post },
  } = useSuspenseQuery({
    queryKey: ['posts', { id: postId }],
    queryFn: () => postsService.getPostById(postId, true),
  });

  const { mutate: triggerUpdatePost, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdatePostSchema) => postsService.updatePost(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully!');
      router.navigate({ to: '/posts/$postId', params: { postId }, replace: true });
    },
  });

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-3'>
        <BackButton disabled={isUpdating} />
        <h2 className='font-medium text-xl'>
          {getTranslation('modules.posts.pages.EditPostPage.title')}
        </h2>
      </div>
      <PostForm
        defaultValues={{
          title: post.title,
          content: post.content,
          isPublic: post.isPublic,
        }}
        onSuccessSubmit={(data) => triggerUpdatePost(data)}
        renderSubmitButton={(Button) => (
          <Button>
            {getTranslation('modules.posts.pages.EditPostPage.postFormSubmitButtonLabel')}
          </Button>
        )}
      />
    </section>
  );
}

export function EditPostPageSkeleton() {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-3'>
        <BackButton />
        <h2 className='font-medium text-xl'>
          {getTranslation('modules.posts.pages.EditPostPage.title')}
        </h2>
        <PostForm loading />
      </div>
    </section>
  );
}

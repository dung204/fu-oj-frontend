import { createFileRoute, notFound } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { Suspense } from 'react';

import { withProps } from '@/base/utils';
import { EditPostPage, EditPostPageSkeleton } from '@/modules/posts/pages/edit-post.page';
import { PostNotFoundPage } from '@/modules/posts/pages/post-not-found.page';
import { postsService } from '@/modules/posts/services/posts.service';

export const Route = createFileRoute('/_not-auth/posts/$postId/edit')({
  loader: async ({ params: { postId }, context: { queryClient } }) => {
    try {
      await queryClient.fetchQuery({
        queryKey: ['posts', { id: postId }],
        queryFn: () => postsService.getPostById(postId, true),
      });
    } catch (error) {
      if (error instanceof AxiosError && error.status === HttpStatusCode.NotFound) {
        throw notFound();
      }

      throw error;
    }
  },
  component: RouteComponent,
  notFoundComponent: withProps(PostNotFoundPage, { showBackButton: true }),
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return (
    <Suspense fallback={<EditPostPageSkeleton />}>
      <EditPostPage postId={postId} />
    </Suspense>
  );
}

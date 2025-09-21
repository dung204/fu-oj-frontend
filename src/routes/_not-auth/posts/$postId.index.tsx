import { createFileRoute, notFound } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { Suspense } from 'react';

import { withProps } from '@/base/utils';
import { PostDetailsPage, PostDetailsPageSkeleton } from '@/modules/posts/pages/post-details.page';
import { PostNotFoundPage } from '@/modules/posts/pages/post-not-found.page';
import { postsService } from '@/modules/posts/services/posts.service';

export const Route = createFileRoute('/_not-auth/posts/$postId/')({
  loader: async ({ params: { postId }, context: { queryClient, user } }) => {
    try {
      const { data: post } = await queryClient.fetchQuery({
        queryKey: ['posts', { id: postId }],
        queryFn: () => postsService.getPostById(postId, !!user),
      });

      return { post };
    } catch (error) {
      if (error instanceof AxiosError && error.status === HttpStatusCode.NotFound) {
        throw notFound();
      }

      throw error;
    }
  },
  component: RouteComponent,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.post.title || 'Post Details'} | TanStack Start Starter Template`,
      },
    ],
  }),
  notFoundComponent: withProps(PostNotFoundPage, { showBackButton: true }),
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const { user } = Route.useRouteContext();

  return (
    <Suspense fallback={<PostDetailsPageSkeleton />}>
      <PostDetailsPage postId={postId} user={user} />
    </Suspense>
  );
}

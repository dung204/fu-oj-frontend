import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { MyPostsPage, MyPostsPageSkeleton } from '@/modules/posts/pages/my-posts.page';
import { postsSearchParamsSchema } from '@/modules/posts/types';
import { myPostsQueryOptions } from '@/modules/posts/utils/my-posts-query-options.util';

export const Route = createFileRoute('/_not-auth/posts/me/')({
  head: () => ({
    meta: [
      {
        title: 'My Posts | TanStack Start Starter Template',
      },
    ],
  }),
  validateSearch: zodValidator(
    postsSearchParamsSchema.omit({ page: true, pageSize: true, user: true })
  ),
  loaderDeps: ({ search: searchParams }) => searchParams,
  loader: ({ context: { queryClient }, deps: searchParams }) => {
    queryClient.prefetchInfiniteQuery(myPostsQueryOptions(searchParams));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <Suspense fallback={<MyPostsPageSkeleton searchParams={searchParams} />}>
      <MyPostsPage searchParams={searchParams} />
    </Suspense>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { PublicPostsPage, PublicPostsPageSkeleton } from '@/modules/posts/pages/public-posts.page';
import { postsSearchParamsSchema } from '@/modules/posts/types';
import { publicPostsQueryOptions } from '@/modules/posts/utils/public-posts-query-options.util';

export const Route = createFileRoute('/_not-auth/')({
  head: () => ({
    meta: [
      {
        title: 'Public Posts | TanStack Start Starter Template',
      },
    ],
  }),
  validateSearch: zodValidator(postsSearchParamsSchema.omit({ page: true, pageSize: true })),
  loaderDeps: ({ search: searchParams }) => searchParams,
  loader: ({ context: { queryClient }, deps: searchParams }) => {
    queryClient.prefetchInfiniteQuery(publicPostsQueryOptions(searchParams));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <Suspense fallback={<PublicPostsPageSkeleton searchParams={searchParams} />}>
      <PublicPostsPage searchParams={searchParams} />
    </Suspense>
  );
}

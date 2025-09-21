import { createFileRoute } from '@tanstack/react-router';

import { NewPostsPage } from '@/modules/posts/pages/new-posts.page';

export const Route = createFileRoute('/_not-auth/posts/new/')({
  head: () => ({
    meta: [
      {
        title: 'New Post | TanStack Start Starter Template',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  // biome-ignore lint/style/noNonNullAssertion: this route is private and user is always defined
  return <NewPostsPage user={user!} />;
}

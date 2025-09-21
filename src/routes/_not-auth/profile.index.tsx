import { createFileRoute } from '@tanstack/react-router';

import { UpdateUserProfilePage } from '@/modules/users/pages/update-user-profile.page';

export const Route = createFileRoute('/_not-auth/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  // biome-ignore lint/style/noNonNullAssertion: this route is private so user will always be defined
  return <UpdateUserProfilePage user={user!} />;
}

import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { GroupsPage, GroupsPageSkeleton } from '@/modules/groups/pages/groups.page';
import { groupsSearchParamsSchema } from '@/modules/groups/types';

export const Route = createFileRoute('/_authed/groups/')({
  validateSearch: zodValidator(groupsSearchParamsSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <Suspense fallback={<GroupsPageSkeleton searchParams={searchParams} />}>
      <GroupsPage searchParams={searchParams} />
    </Suspense>
  );
}

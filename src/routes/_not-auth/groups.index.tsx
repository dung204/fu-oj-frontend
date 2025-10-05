import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { GroupsPage, GroupsPageSkeleton } from '@/modules/groups/pages/groups.page';

export const Route = createFileRoute('/_not-auth/groups/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<GroupsPageSkeleton />}>
      <GroupsPage />
    </Suspense>
  );
}

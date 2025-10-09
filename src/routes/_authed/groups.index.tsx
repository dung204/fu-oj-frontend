import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { GroupsPage, GroupsPageSkeleton } from '@/modules/groups/pages/groups.page';
import { groupsSearchParamsSchema } from '@/modules/groups/types';

export const Route = createFileRoute('/_authed/groups/')({
  head: () => ({
    meta: [
      {
        title: `${getTranslation('modules.groups.pages.GroupsPage.title')} | FPT University Online Judge`,
      },
    ],
  }),
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

import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { Role } from '@/modules/auth/enums/role.enum';
import {
  GroupsPageSkeleton,
  StudentsGroupsPage,
} from '@/modules/groups/pages/students-groups.page';
import { groupsSearchParamsSchema } from '@/modules/groups/types';
import { groupsQueryOptions } from '@/modules/groups/utils/groups-query-options.util';

export const Route = createFileRoute('/_authed/groups/')({
  validateSearch: zodValidator(groupsSearchParamsSchema),
  loaderDeps: ({ search: searchParams }) => searchParams,
  loader: ({ context: { queryClient }, deps: searchParams }) => {
    queryClient.prefetchQuery(groupsQueryOptions(searchParams));
    return searchParams;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${getTranslation(loaderData?.tab === 'mine' ? `modules.groups.pages.GroupsPage.myGroups` : `modules.groups.pages.GroupsPage.publicGroups`)} | FPT University Online Judge`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const { user } = Route.useRouteContext();

  return (
    <Suspense fallback={<GroupsPageSkeleton searchParams={searchParams} />}>
      {user?.role === Role.STUDENT && <StudentsGroupsPage searchParams={searchParams} />}
    </Suspense>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import {
  GroupStudentsPage,
  GroupStudentsPageSkeleton,
} from '@/modules/groups/pages/group-students.page';
import { groupStudentsQueryOptions } from '@/modules/groups/utils/group-students-query-options.util';
import { studentsSearchParamsSchema } from '@/modules/users/types';

export const Route = createFileRoute('/_authed/groups/$groupId/students/')({
  validateSearch: zodValidator(studentsSearchParamsSchema.omit({ pageSize: true })),
  loaderDeps: ({ search: searchParams }) => searchParams,
  loader: ({ context: { queryClient }, params: { groupId }, deps: searchParams }) => {
    queryClient.prefetchQuery(groupStudentsQueryOptions(groupId, searchParams));
  },
  head: ({ match }) => ({
    meta: [
      {
        title: `${
          !match.context.group
            ? getTranslation('modules.groups.pages.GroupNotFoundPage.pageTitle')
            : getTranslation('modules.groups.pages.GroupStudentsPage.title', {
                groupName: match.context.group.name,
              })
        } | FPT University Online Judge`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();
  const searchParams = Route.useSearch();

  return (
    <Suspense fallback={<GroupStudentsPageSkeleton searchParams={searchParams} />}>
      <GroupStudentsPage groupId={groupId} searchParams={searchParams} />
    </Suspense>
  );
}

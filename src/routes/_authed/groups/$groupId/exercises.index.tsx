import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { exercisesSearchParamsSchema } from '@/modules/exercises/types';
import {
  GroupExercisesPage,
  GroupExercisesPageSkeleton,
} from '@/modules/groups/pages/group-exercises.page';
import { groupExercisesQueryOptions } from '@/modules/groups/utils/group-exercises-query-options.util';

export const Route = createFileRoute('/_authed/groups/$groupId/exercises/')({
  validateSearch: zodValidator(exercisesSearchParamsSchema.omit({ pageSize: true })),
  loaderDeps: ({ search: searchParams }) => searchParams,
  loader: ({ params: { groupId }, context: { queryClient }, deps: searchParams }) => {
    queryClient.prefetchQuery(groupExercisesQueryOptions(groupId, searchParams));
  },
  head: ({ match }) => ({
    meta: [
      {
        title: `${
          !match.context.group
            ? getTranslation('modules.groups.pages.GroupNotFoundPage.pageTitle')
            : getTranslation('modules.groups.pages.GroupExercisesPage.title', {
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
    <Suspense fallback={<GroupExercisesPageSkeleton searchParams={searchParams} />}>
      <GroupExercisesPage groupId={groupId} searchParams={searchParams} />
    </Suspense>
  );
}

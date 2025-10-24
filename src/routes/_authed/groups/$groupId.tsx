import { createFileRoute, notFound } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { Suspense } from 'react';

import {
  GroupDetailsPage,
  GroupDetailsPageSkeleton,
} from '@/modules/groups/pages/group-details.page';
import { GroupNotFoundPage } from '@/modules/groups/pages/group-not-found.page';
import { groupsService } from '@/modules/groups/services/groups.service';

export const Route = createFileRoute('/_authed/groups/$groupId')({
  beforeLoad: async ({ params: { groupId }, context: { queryClient } }) => {
    try {
      const { data: group } = await queryClient.fetchQuery({
        queryKey: ['groups', { id: groupId }],
        queryFn: () => groupsService.getGroupById(groupId),
      });

      return { group };
    } catch (error) {
      if (error instanceof AxiosError && error.status === HttpStatusCode.NotFound) {
        return { group: undefined };
      }

      throw error;
    }
  },
  loader: ({ context: { group } }) => {
    if (!group) {
      throw notFound();
    }
  },
  component: RouteComponent,
  notFoundComponent: GroupNotFoundPage,
});

function RouteComponent() {
  const { groupId } = Route.useParams();

  return (
    <Suspense fallback={<GroupDetailsPageSkeleton />}>
      <GroupDetailsPage groupId={groupId} />
    </Suspense>
  );
}

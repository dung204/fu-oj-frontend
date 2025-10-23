import { queryOptions } from '@tanstack/react-query';

import { groupsService } from '@/modules/groups/services/groups.service';
import { GroupsSearchParams } from '@/modules/groups/types';

export const groupsQueryOptions = (searchParams: GroupsSearchParams) =>
  queryOptions({
    queryKey: ['groups', searchParams],
    queryFn: () => groupsService.getGroups(searchParams),
  });

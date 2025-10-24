import { queryOptions } from '@tanstack/react-query';

import { groupsService } from '@/modules/groups/services/groups.service';
import { StudentsSearchParams } from '@/modules/users/types';

export const groupStudentsQueryOptions = (
  groupId: string,
  searchParams: Omit<StudentsSearchParams, 'pageSize'>
) =>
  queryOptions({
    queryKey: ['group', groupId, 'students', searchParams],
    queryFn: () => groupsService.getStudentsOfGroup(groupId, { ...searchParams, pageSize: 20 }),
  });

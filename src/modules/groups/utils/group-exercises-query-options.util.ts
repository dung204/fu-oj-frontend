import { queryOptions } from '@tanstack/react-query';

import { ExercisesSearchParams } from '@/modules/exercises/types';
import { groupsService } from '@/modules/groups/services/groups.service';

export const groupExercisesQueryOptions = (
  groupId: string,
  searchParams: Omit<ExercisesSearchParams, 'pageSize'>
) =>
  queryOptions({
    queryKey: ['group', groupId, 'exercises', searchParams],
    queryFn: () => groupsService.getExercisesOfGroup(groupId, { ...searchParams, pageSize: 20 }),
  });

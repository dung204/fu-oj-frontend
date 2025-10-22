import { queryOptions } from '@tanstack/react-query';

import { exercisesService } from '@/modules/exercises/services/exercises.service';
import { ExercisesSearchParams } from '@/modules/exercises/types';

export const exercisesQueryOptions = (searchParams: ExercisesSearchParams) =>
  queryOptions({
    queryKey: ['exercises', searchParams],
    queryFn: () => exercisesService.getAllExercises(searchParams),
  });

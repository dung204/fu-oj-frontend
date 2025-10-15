import { createFileRoute, notFound } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import {
  ExerciseDetailsPage,
  ExerciseDetailsPageSkeleton,
} from '@/modules/exercises/pages/exercise-details.page';
import { ExerciseNotFoundPage } from '@/modules/exercises/pages/exercise-not-found.page';
import { exercisesService } from '@/modules/exercises/services/exercises.service';

export const Route = createFileRoute('/_authed/exercises/$exerciseId/')({
  loader: async ({ params: { exerciseId }, context: { queryClient } }) => {
    try {
      const { data: exercise } = await queryClient.fetchQuery({
        queryKey: ['exercises', { id: exerciseId }],
        queryFn: () => exercisesService.getExerciseById(exerciseId),
      });

      return exercise;
    } catch (error) {
      if (error instanceof AxiosError && error.status === HttpStatusCode.NotFound) {
        throw notFound();
      }

      throw error;
    }
  },
  head: ({ loaderData: exercise }) => ({
    meta: [
      {
        title: `${!exercise ? getTranslation('modules.exercises.ExerciseNotFoundPage.pageTitle') : `${exercise.code} - ${exercise.title}`} | FPT University Online Judge`,
      },
    ],
  }),
  component: RouteComponent,
  notFoundComponent: ExerciseNotFoundPage,
});

function RouteComponent() {
  const { exerciseId } = Route.useParams();

  return (
    <Suspense fallback={<ExerciseDetailsPageSkeleton />}>
      <ExerciseDetailsPage exerciseId={exerciseId} />
    </Suspense>
  );
}

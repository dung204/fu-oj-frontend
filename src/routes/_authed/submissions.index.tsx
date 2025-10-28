import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { exercisesService } from '@/modules/exercises/services/exercises.service';
import {
  SubmissionsPage,
  SubmissionsPageSkeleton,
} from '@/modules/submissions/pages/submissions.page';
import { submissionsSearchParamsSchema } from '@/modules/submissions/types';

export const Route = createFileRoute('/_authed/submissions/')({
  validateSearch: zodValidator(submissionsSearchParamsSchema),
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps: { exercise: exerciseId } }) => {
    if (exerciseId) {
      const { data: exercise } = await queryClient.fetchQuery({
        queryKey: ['exercises', { id: exerciseId }],
        queryFn: () => exercisesService.getExerciseById(exerciseId),
      });

      return { exercise };
    }

    return { exercise: undefined };
  },
  head: () => ({
    meta: [
      {
        title: `${getTranslation('modules.submissions.pages.SubmissionsPage.title')} | FPT University Online Judge`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const { exercise } = Route.useLoaderData();

  return (
    <Suspense
      fallback={<SubmissionsPageSkeleton searchParams={searchParams} exercise={exercise} />}
    >
      <SubmissionsPage searchParams={searchParams} exercise={exercise} />
    </Suspense>
  );
}

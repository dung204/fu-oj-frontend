import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { ExercisesPage, ExercisesPageSkeleton } from '@/modules/exercises/pages/exercises.page';
import { exercisesSearchParamsSchema } from '@/modules/exercises/types';
import { exercisesQueryOptions } from '@/modules/exercises/utils/exercises-query-options.util';

export const Route = createFileRoute('/_authed/exercises/')({
  head: () => ({
    meta: [
      {
        title: `${getTranslation(`modules.exercises.pages.ExercisesPage.title`)} | FPT University Online Judge`,
      },
    ],
  }),
  validateSearch: zodValidator(
    exercisesSearchParamsSchema.pick({ page: true, title: true, topicId: true })
  ),
  loaderDeps: ({ search: searchParams }) => searchParams,
  loader: ({ context: { queryClient }, deps: searchParams }) => {
    queryClient.prefetchQuery(exercisesQueryOptions(searchParams));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <Suspense fallback={<ExercisesPageSkeleton searchParams={searchParams} />}>
      <ExercisesPage searchParams={searchParams} />
    </Suspense>
  );
}

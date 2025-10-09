import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { ExercisesPage, ExercisesPageSkeleton } from '@/modules/exercises/pages/exercises.page';

export const Route = createFileRoute('/_authed/exercises/')({
  head: () => ({
    meta: [
      {
        title: `${getTranslation(`modules.exercises.pages.ExercisesPage.title`)} | FPT University Online Judge`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<ExercisesPageSkeleton />}>
      <ExercisesPage />
    </Suspense>
  );
}

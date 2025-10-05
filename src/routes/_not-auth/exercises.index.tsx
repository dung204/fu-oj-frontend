import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { ExercisesPage, ExercisesPageSkeleton } from '@/modules/exercises/pages/exercises.page';

export const Route = createFileRoute('/_not-auth/exercises/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<ExercisesPageSkeleton />}>
      <ExercisesPage />
    </Suspense>
  );
}

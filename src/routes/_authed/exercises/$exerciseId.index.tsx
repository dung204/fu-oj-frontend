import { createFileRoute } from '@tanstack/react-router';

import { ExerciseDetailsPage } from '@/modules/exercises/pages/exercise-details.page';

export const Route = createFileRoute('/_authed/exercises/$exerciseId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { exerciseId } = Route.useParams();

  return <ExerciseDetailsPage exerciseId={exerciseId} />;
}

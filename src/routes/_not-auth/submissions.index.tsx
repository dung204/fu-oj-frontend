import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import {
  SubmissionsPage,
  SubmissionsPageSkeleton,
} from '@/modules/submissions/pages/submissions.page';

export const Route = createFileRoute('/_not-auth/submissions/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<SubmissionsPageSkeleton />}>
      <SubmissionsPage />
    </Suspense>
  );
}

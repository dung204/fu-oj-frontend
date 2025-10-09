import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import {
  SubmissionsPage,
  SubmissionsPageSkeleton,
} from '@/modules/submissions/pages/submissions.page';

export const Route = createFileRoute('/_authed/submissions/')({
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
  return (
    <Suspense fallback={<SubmissionsPageSkeleton />}>
      <SubmissionsPage />
    </Suspense>
  );
}

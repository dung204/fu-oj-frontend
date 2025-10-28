import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import {
  SubmissionsPage,
  SubmissionsPageSkeleton,
} from '@/modules/submissions/pages/submissions.page';
import { submissionsSearchParamsSchema } from '@/modules/submissions/types';

export const Route = createFileRoute('/_authed/submissions/')({
  validateSearch: zodValidator(submissionsSearchParamsSchema),
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

  return (
    <Suspense fallback={<SubmissionsPageSkeleton searchParams={searchParams} />}>
      <SubmissionsPage searchParams={searchParams} />
    </Suspense>
  );
}

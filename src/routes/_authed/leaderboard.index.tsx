import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { getTranslation } from '@/base/utils';
import { LeaderboardPage, LeaderboardPageSkeleton } from '@/modules/users/pages/leaderboard.page';

export const Route = createFileRoute('/_authed/leaderboard/')({
  head: () => ({
    meta: [
      {
        title: `${getTranslation('modules.users.pages.LeaderboardPage.title')} | FPT University Online Judge`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<LeaderboardPageSkeleton />}>
      <LeaderboardPage />
    </Suspense>
  );
}

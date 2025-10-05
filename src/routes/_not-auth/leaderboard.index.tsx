import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { LeaderboardPage, LeaderboardPageSkeleton } from '@/modules/users/pages/leaderboard.page';

export const Route = createFileRoute('/_not-auth/leaderboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<LeaderboardPageSkeleton />}>
      <LeaderboardPage />
    </Suspense>
  );
}

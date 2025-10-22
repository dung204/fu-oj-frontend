import { createFileRoute } from '@tanstack/react-router';

import { TopicManagementPage } from '@/modules/exercises/pages/topics.page';

export const Route = createFileRoute('/_authed/_admin/topics/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TopicManagementPage />;
}

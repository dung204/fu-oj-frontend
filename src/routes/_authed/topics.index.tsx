import { createFileRoute } from '@tanstack/react-router';

import { Topic } from '@/modules/exercises/pages/topics.page';

export const Route = createFileRoute('/_authed/topics/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Topic />;
}

import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/groups/$groupId/')({
  beforeLoad: ({ params: { groupId } }) => {
    throw redirect({
      to: '/groups/$groupId/dashboard',
      params: { groupId },
    });
  },
});

import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/')({
  beforeLoad: async () => {
    // TODO: check user, if user exists, redirect to default pages of each roles, else redirect to /auth/login
    throw redirect({
      to: '/exercises',
    });
  },
});

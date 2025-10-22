import { createFileRoute, redirect } from '@tanstack/react-router';

import { Role } from '@/modules/auth/enums/role.enum';

export const Route = createFileRoute('/_authed/')({
  beforeLoad: async ({ context }) => {
    // TODO: check user, if user exists, redirect to default pages of each roles, else redirect to /auth/login
    const { user } = context;

    switch (user?.role) {
      case Role.STUDENT:
        throw redirect({
          to: '/exercises',
        });

      case Role.INSTRUCTOR:
        throw redirect({
          // TODO: replace the below route with the default route of instructors
          to: '/exercises',
        });

      case Role.ADMIN:
        throw redirect({
          // TODO: replace the below route with the default route of admin
          to: '/topics',
        });

      default:
        throw redirect({
          to: '/auth/login',
        });
    }
  },
});

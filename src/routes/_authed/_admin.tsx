import { createFileRoute, redirect } from '@tanstack/react-router';

import { Role } from '@/modules/auth/enums/role.enum';

export const Route = createFileRoute('/_authed/_admin')({
  beforeLoad: async ({ context }) => {
    const { user } = context;

    if (user?.role !== 'ADMIN') {
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

        default:
          throw redirect({
            to: '/auth/login',
          });
      }
    }
  },
});

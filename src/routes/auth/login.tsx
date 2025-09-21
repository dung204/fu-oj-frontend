import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '@/modules/auth/pages/login.page';

export const Route = createFileRoute('/auth/login')({
  head: () => ({
    meta: [
      {
        title: 'Login | TanStack Start Starter Template',
      },
    ],
  }),
  component: LoginPage,
});

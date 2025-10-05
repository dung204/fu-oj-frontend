import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '@/modules/auth/pages/login.page';

export const Route = createFileRoute('/auth/login')({
  head: () => ({
    meta: [
      {
        title: 'Login | FPT University Online Judge',
      },
    ],
  }),
  component: LoginPage,
});

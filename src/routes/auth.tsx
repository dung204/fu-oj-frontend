import { createFileRoute, redirect } from '@tanstack/react-router';
import { decodeJwt } from 'jose';

export const Route = createFileRoute('/auth')({
  beforeLoad: async ({ context }) => {
    const { accessToken, refreshToken, user } = context;

    if (accessToken && user) {
      const { sub, exp } = decodeJwt(accessToken);
      if (exp && exp * 1000 > Date.now() && sub && user.id === sub) {
        throw redirect({
          to: '/',
        });
      }
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  },
});

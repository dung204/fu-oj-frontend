import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import axios from 'axios';
import { decodeJwt } from 'jose';

import { Header } from '@/base/layouts/header';
import { checkIsPrivateRoute } from '@/base/utils';
import { RefreshSuccessResponse } from '@/modules/auth/types';
import { deleteTokensInCookie } from '@/modules/auth/utils/delete-tokens-in-cookie.util';
import { setTokensToCookie } from '@/modules/auth/utils/set-tokens-to-cookie.util';

export const Route = createFileRoute('/_not-auth')({
  beforeLoad: async ({ context, location }) => {
    const { accessToken, refreshToken, user } = context;
    const isPrivateRoute = checkIsPrivateRoute(location.pathname);

    try {
      const { exp, sub } = decodeJwt(accessToken ?? '');
      if ((exp && exp * 1000 < Date.now()) || !user || user.id !== sub) throw new Error();

      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (_accessTokenError) {
      try {
        const {
          data: {
            data: { accessToken: newAccessToken, refreshToken: newRefreshToken, user: newUser },
          },
        } = await axios.post<RefreshSuccessResponse>(
          '/auth/refresh',
          { refreshToken },
          { baseURL: import.meta.env.VITE_API_URL }
        );

        await setTokensToCookie({
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: newUser,
          },
        });

        return {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user: newUser,
        };
      } catch (_refreshTokenError) {
        await deleteTokensInCookie();

        if (isPrivateRoute) {
          throw redirect({
            to: '/auth/login',
          });
        }
      }
    }
  },
  component: NotAuthLayout,
});

function NotAuthLayout() {
  const { user } = Route.useRouteContext();

  return (
    <main className='max-w-2xl mx-auto'>
      <Header user={user} />
      <Outlet />
    </main>
  );
}

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { ScrollArea } from '@/base/components/ui/scroll-area';
import { Header } from '@/base/layouts/header';
import { checkIsPrivateRoute } from '@/base/utils';

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context, location }) => {
    const { accessToken, refreshToken, user } = context;
    const isPrivateRoute = checkIsPrivateRoute(location.pathname);

    if (isPrivateRoute && (!accessToken || !refreshToken || !user)) {
      throw redirect({
        to: '/auth/login',
      });
    }

    // try {
    //   const { exp, sub } = decodeJwt(accessToken ?? '');
    //   if ((exp && exp * 1000 < Date.now()) || !user || user.id !== sub) throw new Error();

    //   return {
    //     accessToken,
    //     refreshToken,
    //     user,
    //   };
    // } catch (_accessTokenError) {
    //   try {
    //     const {
    //       data: {
    //         data: { accessToken: newAccessToken, refreshToken: newRefreshToken, user: newUser },
    //       },
    //     } = await axios.post<RefreshSuccessResponse>(
    //       '/auth/refresh',
    //       { refreshToken },
    //       { baseURL: import.meta.env.VITE_API_URL }
    //     );

    //     await setTokensToCookie({
    //       data: {
    //         accessToken: newAccessToken,
    //         refreshToken: newRefreshToken,
    //         user: newUser,
    //       },
    //     });

    //     return {
    //       accessToken: newAccessToken,
    //       refreshToken: newRefreshToken,
    //       user: newUser,
    //     };
    //   } catch (_refreshTokenError) {
    //     await deleteTokensInCookie();

    //     if (isPrivateRoute) {
    //       throw redirect({
    //         to: '/auth/login',
    //       });
    //     }
    //   }
    // }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { user } = Route.useRouteContext();

  return (
    <>
      <Header user={user!} />
      <ScrollArea className='w-full h-[calc(100vh-66px)]'>
        <main className='container mx-auto py-10'>
          <Outlet />
        </main>
      </ScrollArea>
    </>
  );
}

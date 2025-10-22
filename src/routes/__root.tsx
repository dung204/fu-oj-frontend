/// <reference types="vite/client" />

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactNode, useEffect } from 'react';

import { Toaster } from '@/base/components/ui/toaster';
import { setupAxiosInterceptors } from '@/base/lib/httpRequest';
import appCss from '@/base/styles/globals.css?url';
import { getTokensFromCookie } from '@/modules/auth/utils/get-tokens-from-cookie.util';
import 'antd/dist/reset.css';

import { GlobalComponent } from '@/base/components/global/GlobalComponent';
import * as http from '@/base/lib/httpRequest';
// import authentication from '@/modules/LR/authentication';
import { authentication } from '@/modules/LR/authentication';

setupAxiosInterceptors(() => {
  console.log('Token expired');
  localStorage.removeItem('authenticationToken');
  sessionStorage.removeItem('authenticationToken');
  window.location.href = '/';
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'FPT University Online Judge',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'FU-OJ',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  }),
  beforeLoad: async () => {
    return await getTokensFromCookie();
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    authentication.getAccount();

    http.post('/auth/register', {
      email: 'admin@gmail.com',
      password: '123456',
    });
  }, []);

  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body className='overflow-y-hidden'>
        {children}
        <GlobalComponent />
        <Toaster richColors position='top-right' />
        <TanStackRouterDevtools position='bottom-left' />
        <ReactQueryDevtools initialIsOpen={false} />
        <Scripts />
      </body>
    </html>
  );
}

/// <reference types="vite/client" />

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactNode } from 'react';

import { GlobalComponent } from '@/base/components/global/GlobalComponent';
import { Toaster } from '@/base/components/ui/toaster';
import { HttpClient } from '@/base/lib';
import { setupAxiosInterceptors } from '@/base/lib/httpRequest';
import appCss from '@/base/styles/globals.css?url';
import { getTokensFromCookie } from '@/modules/auth/utils/get-tokens-from-cookie.util';

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
    scripts: [
      {
        src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        async: true,
        defer: true,
      },
    ],
  }),
  beforeLoad: async () => {
    const payload = await getTokensFromCookie();
    HttpClient.accessToken = payload.accessToken;
    HttpClient.refreshToken = payload.refreshToken;

    return payload;
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

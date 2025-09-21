/// <reference types="vite/client" />

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactNode } from 'react';

import { ScrollArea } from '@/base/components/ui/scroll-area';
import { Toaster } from '@/base/components/ui/toaster';
import appCss from '@/base/styles/globals.css?url';
import { getTokensFromCookie } from '@/modules/auth/utils/get-tokens-from-cookie.util';

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
        title: 'TanStack Start Starter Template',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
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
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScrollArea className='w-full h-screen'>{children}</ScrollArea>
        <Toaster richColors position='top-right' />
        <TanStackRouterDevtools position='bottom-left' />
        <ReactQueryDevtools initialIsOpen={false} />
        <Scripts />
      </body>
    </html>
  );
}

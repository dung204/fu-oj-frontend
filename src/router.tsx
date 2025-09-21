import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { AxiosError, HttpStatusCode } from 'axios';

import { routeTree } from './routeTree.gen';

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchOnReconnect: false,
        refetchOnMount: false,
        networkMode: 'always',
        retryDelay: 0,
        retry: handleRetries,
      },
      mutations: {
        networkMode: 'always',
        retryDelay: 0,
        retry: handleRetries,
      },
    },
  });

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    scrollRestoration: true,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

function handleRetries(failureCount: number, error: Error) {
  // Does not retry if status code is 4XX
  if (error instanceof AxiosError && error.status && error.status >= 400 && error.status < 500) {
    if (error.status === HttpStatusCode.TooManyRequests && typeof window !== 'undefined') {
      import('sonner').then(({ toast }) => {
        toast.error(`You've requested too much. Please try again later.`);
      });
    }
    return false;
  }

  // Retry only 3 times
  if (failureCount > 2) {
    if (typeof window !== 'undefined') {
      import('sonner').then(({ toast }) => {
        toast.error('Something went wrong. Please try again later.');
      });
    }
    return false;
  }
  return true;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

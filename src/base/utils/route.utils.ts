import { pathToRegexp } from 'path-to-regexp';

export const publicRoutes = ['/'];

export const privateRoutes = [
  '/user/*path',
  '/posts/me',
  '/posts/new',
  '/posts/:postId/edit',
  '/profile',
];

export function checkIsPrivateRoute(route: string) {
  return privateRoutes.some((r) => pathToRegexp(r).regexp.test(route));
}

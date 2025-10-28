import { pathToRegexp } from 'path-to-regexp';

export const privateRoutes = [
  '/user{/*path}',
  '/exercises{/*path}',
  '/submissions{/*path}',
  '/leaderboard{/*path}',
  '/profile',
  '/admin{/*path}',
  '/groups{/*path}',
];

export function checkIsPrivateRoute(route: string) {
  return privateRoutes.some((r) => pathToRegexp(r).regexp.test(route));
}

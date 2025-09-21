import { createServerFn } from '@tanstack/react-start';
import { deleteCookie } from '@tanstack/react-start/server';

/**
 * Deletes authentication-related cookies from the server.
 *
 * Removes the following cookies:
 * - `accessToken`
 * - `refreshToken`
 * - `user`
 *
 * This utility is typically used to log out a user by clearing their session tokens.
 *
 * @returns void
 * @usage
 * ```ts
 * await deleteTokensInCookie();
 * ```
 */
export const deleteTokensInCookie = createServerFn().handler(() => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('user');
});

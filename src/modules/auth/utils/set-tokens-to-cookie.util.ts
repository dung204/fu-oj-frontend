import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';

import { LoginSuccessPayload, loginSuccessPayloadSchema } from '../types';

/**
 * Sets authentication tokens and user information into HTTP-only cookies.
 *
 * This function validates the provided login payload and stores the `accessToken`,
 * `refreshToken`, and serialized `user` object in cookies with secure, HTTP-only,
 * and same-site attributes for enhanced security.
 *
 * @param data - The validated login payload containing tokens and user information.
 * @returns void
 *
 * @usage
 * ```ts
 * await setTokensToCookie({
 *   data: {
 *     accessToken: newAccessToken,
 *     refreshToken: newRefreshToken,
 *     user: newUser,
 *   },
 * });
 * ```
 */
export const setTokensToCookie = createServerFn()
  .validator((data: LoginSuccessPayload) => loginSuccessPayloadSchema.parse(data))
  .handler(({ data }) => {
    setCookie('accessToken', data.accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
    setCookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
    setCookie('user', encodeURIComponent(JSON.stringify(data.user)), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
  });

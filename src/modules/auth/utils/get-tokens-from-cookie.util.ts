import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import axios from 'axios';
import { decodeJwt } from 'jose';
import z from 'zod';

import { userSchema } from '@/modules/users/types';

import { RefreshSuccessResponse } from '../types';

import { deleteTokensInCookie } from './delete-tokens-in-cookie.util';
import { setTokensToCookie } from './set-tokens-to-cookie.util';

/**
 * Retrieves authentication tokens and user information from cookies.
 *
 * - Attempts to parse the `accessToken`, `refreshToken`, and `user` from cookies.
 * - Validates the access token's expiration and user identity.
 * - If the access token is invalid or expired, tries to refresh tokens using the refresh token.
 * - On successful refresh, updates cookies with new tokens and user data.
 * - If both access and refresh tokens are invalid, deletes tokens from cookies and returns undefined values.
 *
 * @returns An object containing `accessToken`, `refreshToken`, and `user` if valid, otherwise undefined values.
 * @usage
 * ```ts
 * const { accessToken, refreshToken, user } = await getTokensFromCookie()
 * ```
 */
export const getTokensFromCookie = createServerFn().handler(async () => {
  const accessToken = z.jwt().safeParse(getCookie('accessToken')).data;
  const refreshToken = z.jwt().safeParse(getCookie('refreshToken')).data;
  const user = userSchema.safeParse(
    JSON.parse(decodeURIComponent(getCookie('user') ?? 'null'))
  ).data;

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
      return {
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
      };
    }
  }
});

import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';

import { User, userSchema } from '../types';

export const setUserToCookies = createServerFn()
  .validator((data: User) => userSchema.parse(data))
  .handler(({ data }) => {
    setCookie('user', encodeURIComponent(JSON.stringify(data)), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
  });

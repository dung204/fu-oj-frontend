import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';

import { UpdateUserSchema, User } from '../types';
import { setUserToCookies } from '../utils/set-user-to-cookies.util';

class UsersService extends HttpClient {
  public async updateUserProfile(payload: UpdateUserSchema) {
    const updateProfileRes = await this.patch<SuccessResponse<User>>(
      '/me/profile',
      { firstName: payload.firstName, lastName: payload.lastName },
      {
        isPrivateRoute: true,
      }
    );

    const user = updateProfileRes.data;

    if (payload.avatar?.[0]?.file) {
      const formData = new FormData();
      formData.set('file', payload.avatar[0].file);
      const updateAvatarRes = await this.patch<SuccessResponse<User>>('/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        isPrivateRoute: true,
      });

      updateProfileRes.data.avatar = updateAvatarRes.data.avatar;
      user.avatar = updateAvatarRes.data.avatar;
    }

    await setUserToCookies({
      data: user,
    });

    return updateProfileRes;
  }

  public async updateUserAvatar(file: File) {
    const formData = new FormData();
    formData.set('file', file);

    const res = await this.patch<SuccessResponse<User>>('/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      isPrivateRoute: true,
    });

    await setUserToCookies({
      data: res.data,
    });

    return res;
  }
}

export const usersService = new UsersService();

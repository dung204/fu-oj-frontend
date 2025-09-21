import z from 'zod';

import { SuccessResponse } from '@/base/types';

import { userSchema } from '../users/types';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSuccessPayloadSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
  user: userSchema,
});

export type LoginSuccessPayload = z.infer<typeof loginSuccessPayloadSchema>;
export type LoginSuccessResponse = SuccessResponse<LoginSuccessPayload>;
export type RegisterSuccessResponse = LoginSuccessResponse;
export type RefreshSuccessResponse = LoginSuccessResponse;

export const changePasswordSchema = z
  .object({
    password: z.string().optional(),
    newPassword: z.string().min(8),
    confirmPassword: z.string().nonempty(),
  })
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp với mật khẩu mới',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

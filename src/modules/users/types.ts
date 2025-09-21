import z from 'zod';

import { imagePayloadSchema } from '@/base/components/ui/image-uploader';
import { baseEntitySchema } from '@/base/types';

import { Role } from '../auth/enums/role.enum';

export const userSchema = baseEntitySchema.extend({
  email: z.email(),
  role: z.enum(Role),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  avatar: z
    .object({
      fileName: z.string(),
      url: z.url(),
    })
    .nullable(),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.array(imagePayloadSchema),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

import z from 'zod';

import { baseEntitySchema, commonSearchParamsSchema } from '@/base/types';
import { userSchema } from '@/modules/users/types';

export const groupSchema = baseEntitySchema.extend({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  owner: userSchema,
  studentsCount: z.int(),
  joined: z.boolean().optional(),
});

export type Group = z.infer<typeof groupSchema>;

export const groupsSearchParamsSchema = commonSearchParamsSchema.extend({
  name: z.string().optional(),
  tab: z.enum(['mine', 'public']).catch('mine'),
  isPublic: z.enum(['true', 'false']).optional(),
});

export type GroupsSearchParams = z.infer<typeof groupsSearchParamsSchema>;

export const joinGroupPayloadSchema = z.object({
  code: z
    .string()
    .nonempty()
    .regex(/^\w{8}$/),
});

export type JoinGroupPayload = z.infer<typeof joinGroupPayloadSchema>;

export const groupDetailsPageSearchParamsSchema = z.object({
  tab: z.enum(['dashboard', 'students']).catch('dashboard'),
});

export type GroupDetailsPageSearchParams = z.infer<typeof groupDetailsPageSearchParamsSchema>;

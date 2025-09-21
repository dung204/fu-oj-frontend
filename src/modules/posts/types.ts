import z from 'zod';

import { baseEntitySchema, commonSearchParamsSchema } from '@/base/types';

import { userSchema } from '../users/types';

export const postSchema = baseEntitySchema.extend({
  title: z.string(),
  content: z.string(),
  user: userSchema,
  isPublic: z.boolean(),
});

export type Post = z.infer<typeof postSchema>;

export const postsSearchParamsSchema = commonSearchParamsSchema.extend({
  title: z.string().optional(),
  user: z.uuid({ version: 'v4' }).optional(),
});

export type PostsSearchParams = z.infer<typeof postsSearchParamsSchema>;

export const createPostSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  isPublic: z.boolean(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const updatePostSchema = createPostSchema.partial();

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;

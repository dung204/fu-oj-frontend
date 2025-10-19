import z from 'zod';

import { baseEntitySchema, commonSearchParamsSchema } from '@/base/types';

export const topicSchema = baseEntitySchema.extend({
  name: z.string(),
  description: z.string(),
});

export type Topic = z.infer<typeof topicSchema>;

export const topicsSearchParamsSchema = commonSearchParamsSchema.extend({
  name: z.string().optional(),
});

export type TopicsSearchParams = z.infer<typeof topicsSearchParamsSchema>;

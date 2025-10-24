import z from 'zod';

import { baseEntitySchema, commonSearchParamsSchema } from '@/base/types';
import { testCaseSchema } from '@/modules/test-cases/types';
import { topicSchema } from '@/modules/topics/types';

export const exerciseSchema = baseEntitySchema.extend({
  code: z.string(),
  title: z.string(),
  description: z.string(),
  maxSubmissions: z.int(),
  topics: z.array(topicSchema),
  testCases: z.array(testCaseSchema),
  testCasesCount: z.int(),
});

export type Exercise = z.infer<typeof exerciseSchema>;

export const exercisesSearchParamsSchema = commonSearchParamsSchema.extend({
  query: z.string().optional(),
  topic: z.string().optional(),
});

export type ExercisesSearchParams = z.infer<typeof exercisesSearchParamsSchema>;

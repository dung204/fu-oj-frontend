import z from 'zod';

import { baseEntitySchema } from '@/base/types';
import { exerciseSchema } from '@/modules/exercises/types';
import { testCaseResultSchema } from '@/modules/test-cases/types';
import { userSchema } from '@/modules/users/types';

export const createSubmissionSchema = z.object({
  exerciseId: z.uuid(),
  languageCode: z.string(),
  sourceCode: z.string().regex(/\S/),
});

export type CreateSubmissionPayload = z.infer<typeof createSubmissionSchema>;

export const runCodeResultSchema = z.object({
  allPassed: z.boolean(),
  exerciseId: z.string(),
  exerciseTitle: z.string(),
  passedTestCases: z.int(),
  totalTestCases: z.int(),
  results: z.array(testCaseResultSchema),
});

export type RunCodeResult = z.infer<typeof runCodeResultSchema>;

export const submissionResultSchema = baseEntitySchema.extend({
  user: userSchema,
  exercise: exerciseSchema,
  code: z.string().nullable(),
  sourceCode: z.string(),
  languageCode: z.string(),
  time: z.string().nullable(),
  memory: z.number().nullable(),
  exerciseItem: z.string(),
  passedTestCases: z.int(),
  totalTestCases: z.int(),
});

export type SubmissionResult = z.infer<typeof submissionResultSchema>;

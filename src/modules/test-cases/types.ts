import z from 'zod';

import { baseEntitySchema } from '@/base/types';

export const testCaseSchema = baseEntitySchema.extend({
  input: z.string(),
  output: z.string(),
  note: z.string().optional(),
  isPublic: z.boolean(),
});

export type TestCase = z.infer<typeof testCaseSchema>;

export const testCaseResultSchema = z.object({
  testCaseIndex: z.int(),
  input: z.string().nullable(),
  expectedOutput: z.string().nullable(),
  actualOutput: z.string().nullable(),
  stderr: z.string().nullable(),
  compileOutput: z.string().nullable(),
  time: z.string().nullable(),
  memory: z.int(),
  status: z.object({
    id: z.int(),
    description: z.string(),
  }),
  passed: z.boolean(),
});

export type TestCaseResult = z.infer<typeof testCaseResultSchema>;

import z from 'zod';

import { baseEntitySchema } from '@/base/types';

export const testCaseSchema = baseEntitySchema.extend({
  input: z.string().nullable(),
  output: z.string().nullable(),
  note: z.string().optional().nullable(),
  isPublic: z.boolean(),
});

export type TestCase = z.infer<typeof testCaseSchema>;

export const testCaseResultSchema = z.object({
  testCaseId: z.uuid({ version: 'v4' }),
  testCaseIndex: z.int().nullable(),
  input: z.string().nullable(),
  expectedOutput: z.string().nullable(),
  actualOutput: z.string().nullable(),
  stderr: z.string().nullable(),
  compileOutput: z.string().nullable(),
  time: z.string().nullable(),
  memory: z.number().nullable(),
  status: z.object({
    id: z.int(),
    description: z.string(),
  }),
  passed: z.boolean(),
  isPublic: z.boolean(),
});

export type TestCaseResult = z.infer<typeof testCaseResultSchema>;

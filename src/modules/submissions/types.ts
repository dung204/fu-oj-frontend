import z from 'zod';

import { testCaseResultSchema } from '@/modules/test-cases/types';

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

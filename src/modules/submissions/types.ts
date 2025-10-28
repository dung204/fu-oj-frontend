import z from 'zod';

import { baseEntitySchema, commonSearchParamsSchema } from '@/base/types';
import { exerciseSchema } from '@/modules/exercises/types';
import { verdicts } from '@/modules/submissions/constants/verdicts.constant';
import { testCaseResultSchema } from '@/modules/test-cases/types';
import { userSchema } from '@/modules/users/types';

export const submissionResultSchema = z.object({
  token: z.string(),
  actualOutput: z.string().nullable(),
  stderr: z.string().nullable(),
  verdict: z.string(),
  time: z.string().nullable(),
  memory: z.string().nullable(),
});

export type SubmissionResult = z.infer<typeof submissionResultSchema>;

export const submissionSchema = baseEntitySchema.extend({
  user: userSchema,
  exercise: exerciseSchema,
  sourceCode: z.string(),
  languageCode: z.string(),
  time: z.string().nullable(),
  memory: z.string().nullable(),
  verdict: z.enum(Object.keys(verdicts)),
  passedTestCases: z.int(),
  totalTestCases: z.int(),
  submissionResults: z.array(submissionResultSchema),
});

export type Submission = z.infer<typeof submissionSchema>;

export const createSubmissionSchema = z.object({
  exerciseId: z.uuid(),
  languageCode: z.string(),
  sourceCode: z.string().regex(/\S/),
  // turnstileToken: z.string().nonempty(),
});

export type CreateSubmissionPayload = z.infer<typeof createSubmissionSchema>;

export const runCodePayloadSchema = createSubmissionSchema;
// TODO: Uncomment this when Turnstile is back
// .omit({ turnstileToken: true });

export type RunCodePayload = z.infer<typeof runCodePayloadSchema>;

export const submissionsSearchParamsSchema = commonSearchParamsSchema.extend({
  status: z.array(z.enum(Object.keys(verdicts))).optional(),
  languageCode: z.array(z.string()).optional(),
  student: z.uuid().optional(),
  exercise: z.uuid().optional(),
});

export type SubmissionsSearchParams = z.infer<typeof submissionsSearchParamsSchema>;

export const runCodeResultSchema = z.object({
  allPassed: z.boolean(),
  exerciseId: z.string(),
  exerciseTitle: z.string(),
  passedTestCases: z.int(),
  totalTestCases: z.int(),
  results: z.array(testCaseResultSchema),
});

export type RunCodeResult = z.infer<typeof runCodeResultSchema>;

export type SubmissionStatistics = Record<keyof typeof verdicts, number> & { totalCount: number };

import z from 'zod';

import { programmingLanguages } from '@/base/components/ui/programming-language-select';
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
  memory: z.number().nullable(),
});

export type SubmissionResult = z.infer<typeof submissionResultSchema>;

export const submissionSchema = baseEntitySchema
  .extend({
    user: userSchema,
    exercise: exerciseSchema,
    code: z.string().nullable(),
    sourceCode: z.string(),
    languageCode: z.string(),
    time: z.string().nullable(),
    memory: z.string().nullable(),
    exerciseItem: z.string(),
    passedTestCases: z.int(),
    totalTestCases: z.int(),
    submissionResults: z.array(submissionResultSchema),
  })
  .transform(({ languageCode, ...submission }) => ({
    ...submission,
    verdict:
      verdicts[
        submission.submissionResults.find((result) => result.verdict !== verdicts.ACCEPTED.name)
          ?.verdict ?? 'ACCEPTED'
      ].shortName,
    language:
      programmingLanguages.find((lang) => lang.id === Number(languageCode))?.name || 'Unknown',
  }));

export type Submission = z.infer<typeof submissionSchema>;

export const createSubmissionSchema = z.object({
  exerciseId: z.uuid(),
  languageCode: z.string(),
  sourceCode: z.string().regex(/\S/),
  turnstileToken: z.string().nonempty(),
});

export type CreateSubmissionPayload = z.infer<typeof createSubmissionSchema>;

export const runCodePayloadSchema = createSubmissionSchema.omit({ turnstileToken: true });

export type RunCodePayload = z.infer<typeof runCodePayloadSchema>;

export const submissionsSearchParamsSchema = commonSearchParamsSchema.extend({
  status: z.array(z.uuid()).optional(),
  languageCode: z.array(z.uuid()).optional(),
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

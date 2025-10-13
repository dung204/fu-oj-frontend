import z from 'zod';

import { baseEntitySchema } from '@/base/types';

export const testCaseSchema = baseEntitySchema.extend({
  input: z.string(),
  output: z.string(),
  isPublic: z.boolean(),
});

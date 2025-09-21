import { z } from 'zod';

export const commonSearchParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
  order: z.array(z.string()).optional(),
});

export type CommonSearchParams = z.infer<typeof commonSearchParamsSchema>;

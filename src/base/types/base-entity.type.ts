import { z } from 'zod';

export const baseEntitySchema = z.object({
  id: z.string(),
  createdTimestamp: z.string(),
  updatedTimestamp: z.string(),
  deletedTimestamp: z.string().nullable(),
});

export type BaseEntity = z.infer<typeof baseEntitySchema>;

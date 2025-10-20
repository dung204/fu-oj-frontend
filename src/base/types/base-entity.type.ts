import { z } from 'zod';

export const baseEntitySchema = z.object({
  id: z.string(),
  createdTimestamp: z.coerce.date(),
  updatedTimestamp: z.coerce.date(),
  deletedTimestamp: z.coerce.date().nullable(),
});

export type BaseEntity = z.infer<typeof baseEntitySchema>;

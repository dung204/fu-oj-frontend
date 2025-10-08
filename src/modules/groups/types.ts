import z from 'zod';

export const groupsSearchParamsSchema = z.object({
  tab: z.enum(['mine', 'public']).catch('mine'),
});

export type GroupsSearchParams = z.infer<typeof groupsSearchParamsSchema>;

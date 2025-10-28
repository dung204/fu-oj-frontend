import { queryOptions } from '@tanstack/react-query';

import { submissionsService } from '@/modules/submissions/services/submissions.service';
import { SubmissionsSearchParams } from '@/modules/submissions/types';

export const submissionsQueryOptions = (searchParams: SubmissionsSearchParams) =>
  queryOptions({
    queryKey: ['submissions', searchParams],
    queryFn: () =>
      submissionsService.getAllSubmissions({ order: ['createdTimestamp:desc'], ...searchParams }),
  });

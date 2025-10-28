import { queryOptions } from '@tanstack/react-query';

import { submissionsService } from '@/modules/submissions/services/submissions.service';
import { SubmissionsSearchParams } from '@/modules/submissions/types';

export const submissionStatisticsQueryOptions = (
  searchParams: Omit<SubmissionsSearchParams, 'page' | 'pageSize' | 'order'>
) =>
  queryOptions({
    queryKey: ['submissions', 'statistics', searchParams],
    queryFn: () => submissionsService.getSubmissionStatistics(searchParams),
  });

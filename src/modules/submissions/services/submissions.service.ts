import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import {
  CreateSubmissionPayload,
  RunCodePayload,
  RunCodeResult,
  Submission,
  SubmissionStatistics,
  SubmissionsSearchParams,
  submissionSchema,
} from '@/modules/submissions/types';

class SubmissionsService extends HttpClient {
  public async getAllSubmissions(
    params: SubmissionsSearchParams
  ): Promise<SuccessResponse<Submission[]>> {
    const { data, ...rest } = await this.get<SuccessResponse<unknown[]>>('/submissions', {
      params,
      isPrivateRoute: true,
    });

    return {
      data: data.map((submission) => submissionSchema.parse(submission)),
      ...rest,
    };
  }

  public runCode(payload: RunCodePayload) {
    return this.post<SuccessResponse<RunCodeResult>>('/submissions/run', payload, {
      isPrivateRoute: true,
    });
  }

  public submitCode(payload: CreateSubmissionPayload) {
    return this.post<SuccessResponse<Submission>>('/submissions', payload, {
      isPrivateRoute: true,
      // TODO: Uncomment this when Turnstile is back
      // headers: {
      //   'cf-turnstile-response': turnstileToken,
      // },
    });
  }

  public async getSubmissionStatistics(
    params: Omit<SubmissionsSearchParams, 'page' | 'pageSize' | 'order'>
  ) {
    return this.get<SuccessResponse<SubmissionStatistics>>('/submissions/statistics', {
      params,
      isPrivateRoute: true,
    });
  }
}

export const submissionsService = new SubmissionsService();

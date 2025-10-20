import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import {
  CreateSubmissionPayload,
  RunCodePayload,
  RunCodeResult,
  Submission,
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

  public submitCode({ turnstileToken, ...payload }: CreateSubmissionPayload) {
    return this.post<SuccessResponse<Submission>>('/submissions', payload, {
      isPrivateRoute: true,
      headers: {
        'cf-turnstile-response': turnstileToken,
      },
    });
  }
}

export const submissionsService = new SubmissionsService();

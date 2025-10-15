import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import { CreateSubmissionPayload, RunCodeResult } from '@/modules/submissions/types';

class SubmissionsService extends HttpClient {
  public runCode(payload: CreateSubmissionPayload) {
    return this.post<SuccessResponse<RunCodeResult>>('/submissions/run', payload, {
      isPrivateRoute: true,
    });
  }
}

export const submissionsService = new SubmissionsService();

import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import {
  CreateSubmissionPayload,
  RunCodeResult,
  SubmissionResult,
} from '@/modules/submissions/types';

class SubmissionsService extends HttpClient {
  public runCode(payload: CreateSubmissionPayload) {
    return this.post<SuccessResponse<RunCodeResult>>('/submissions/run', payload, {
      isPrivateRoute: true,
    });
  }

  public submitCode(payload: CreateSubmissionPayload) {
    return this.post<SuccessResponse<SubmissionResult>>('/submissions/base64', payload, {
      isPrivateRoute: true,
    });
  }
}

export const submissionsService = new SubmissionsService();

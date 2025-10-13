import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import { Topic, TopicsSearchParams } from '@/modules/topics/types';

class TopicsService extends HttpClient {
  public getAllTopics(params: TopicsSearchParams) {
    return this.get<SuccessResponse<Topic[]>>('/topics', {
      params,
    });
  }
}

export const topicsService = new TopicsService();

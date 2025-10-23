import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import { Group, GroupsSearchParams, JoinGroupPayload } from '@/modules/groups/types';

class GroupsService extends HttpClient {
  async getGroups({ tab, ...params }: GroupsSearchParams) {
    return this.get<SuccessResponse<Group[]>>('/groups', {
      params: {
        ...(tab === 'mine' && { filter: 'joined' }),
        ...params,
      },
      isPrivateRoute: true,
    });
  }

  async getGroupById(id: string) {
    return this.get<SuccessResponse<Group>>(`/groups/${id}`, {
      isPrivateRoute: true,
    });
  }

  async joinGroup(payload: JoinGroupPayload) {
    return this.post<SuccessResponse<Group>>('/groups/join', payload, {
      isPrivateRoute: true,
    });
  }
}

export const groupsService = new GroupsService();

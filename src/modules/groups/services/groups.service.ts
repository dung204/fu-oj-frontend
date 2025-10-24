import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';
import { Exercise, ExercisesSearchParams } from '@/modules/exercises/types';
import { Group, GroupsSearchParams, JoinGroupPayload } from '@/modules/groups/types';
import { StudentsSearchParams, User } from '@/modules/users/types';

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

  async getStudentsOfGroup(groupId: string, params: StudentsSearchParams) {
    return this.get<SuccessResponse<User[]>>(`/groups/${groupId}/students`, {
      params,
      isPrivateRoute: true,
    });
  }

  async getExercisesOfGroup(groupId: string, params: ExercisesSearchParams) {
    return this.get<SuccessResponse<Exercise[]>>(`/groups/${groupId}/exercises`, {
      params,
      isPrivateRoute: true,
    });
  }
}

export const groupsService = new GroupsService();

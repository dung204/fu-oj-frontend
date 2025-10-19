import { HttpClient } from '@/base/lib/http-client.lib';
import { SuccessResponse } from '@/base/types';
import { Exercise, ExercisesSearchParams } from '@/modules/exercises/types';

class ExercisesService extends HttpClient {
  public getAllExercises(params: ExercisesSearchParams) {
    return this.get<SuccessResponse<Exercise[]>>('/exercises', {
      params,
      isPrivateRoute: true,
    });
  }

  public getExerciseById(id: string) {
    return this.get<SuccessResponse<Exercise>>(`/exercises/${id}`, {
      isPrivateRoute: true,
    });
  }
}

export const exercisesService = new ExercisesService();

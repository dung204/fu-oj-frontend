import { Pagination } from './pagination.type';
import { Sorting } from './sorting.type';

export type SuccessResponse<T> = (T extends unknown[]
  ? {
      data: T;
      metadata: {
        pagination: Pagination;
        sorting: Sorting[];
        filters: Record<string, unknown>;
      };
    }
  : { data: T }) & {
  status: number;
  message: string;
  timestamp: string;
};

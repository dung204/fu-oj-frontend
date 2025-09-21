export interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

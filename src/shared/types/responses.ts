export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  currentPage: number;
};

export interface PaginationResultDto<T> {
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  nextPage: number;
  items: T[];
}

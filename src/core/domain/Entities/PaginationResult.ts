export interface PaginationResult<T> {
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  nextPage: number;
  items: T[];
}

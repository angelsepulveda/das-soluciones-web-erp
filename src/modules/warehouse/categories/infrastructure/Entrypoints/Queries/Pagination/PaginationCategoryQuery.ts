import { CategoryPaginationDto } from '@warehouse/categories/infrastructure/Dtos/CategoryPaginationDto';

export class PaginationCategoryQuery {
  constructor(public readonly request: CategoryPaginationDto) {}
}

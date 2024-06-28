import { PaginationParams } from '@core/domain/Entities/PaginationParams';
import { PaginationResult } from '@core/domain/Entities/PaginationResult';
import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface PaginationCategoryRepository {
  handle: (params: PaginationParams) => Promise<PaginationResult<Category>>;
}

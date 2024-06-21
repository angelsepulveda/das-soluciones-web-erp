import { Category } from '@warehouse/categories/domain/entities/category';

export interface CreateCategoryRepository {
  handle: (category: Category) => Promise<void>;
}

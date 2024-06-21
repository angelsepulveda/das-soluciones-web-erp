import { Category } from '@warehouse/categories/domain/entities/category';

export interface UpdateCategoryRepository {
  handle: (category: Category) => Promise<void>;
}

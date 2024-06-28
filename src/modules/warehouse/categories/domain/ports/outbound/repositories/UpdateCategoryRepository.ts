import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface UpdateCategoryRepository {
  handle: (category: Category) => Promise<void>;
}

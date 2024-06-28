import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface CreateCategoryRepository {
  handle: (category: Category) => Promise<void>;
}

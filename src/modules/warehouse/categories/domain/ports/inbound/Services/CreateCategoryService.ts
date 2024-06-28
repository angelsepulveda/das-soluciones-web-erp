import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface CreateCategoryService {
  handle: (category: Category) => Promise<void>;
}

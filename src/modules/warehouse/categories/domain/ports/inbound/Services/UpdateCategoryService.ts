import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface UpdateCategoryService {
  handle: (category: Category) => Promise<void>;
}

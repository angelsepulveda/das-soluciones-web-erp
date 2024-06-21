import { Category } from '@warehouse/categories/domain/entities/category';

export interface UpdateCategoryService {
  handle: (category: Category) => Promise<void>;
}

import { Category } from '@warehouse/categories/domain/entities/category';

export interface CreateCategoryService {
  handle: (category: Category) => Promise<void>;
}

import { Category } from '@warehouse/categories/domain/entities/category';

export interface FindAllCategoryService {
  handle: () => Promise<Category[]>;
}

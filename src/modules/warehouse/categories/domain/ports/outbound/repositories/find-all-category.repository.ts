import { Category } from '@warehouse/categories/domain/entities/category';

export interface FindAllCategoryRepository {
  handle: () => Promise<Category[]>;
}

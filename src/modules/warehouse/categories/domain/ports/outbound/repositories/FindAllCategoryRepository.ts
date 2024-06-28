import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface FindAllCategoryRepository {
  handle: () => Promise<Category[]>;
}

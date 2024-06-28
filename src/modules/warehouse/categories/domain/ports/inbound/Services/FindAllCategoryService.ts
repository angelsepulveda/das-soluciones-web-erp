import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface FindAllCategoryService {
  handle: () => Promise<Category[]>;
}

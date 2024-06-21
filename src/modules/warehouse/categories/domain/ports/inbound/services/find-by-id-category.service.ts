import { Nullable } from '@core/domain/primitives/nullable';
import { CategoryId } from '@warehouse/categories/domain/value-objects/category-id';
import { Category } from '@warehouse/categories/domain/entities/category';

export interface FindByIdCategoryService {
  handle: (id: CategoryId) => Promise<Nullable<Category>>;
}

import { CategoryId } from '@warehouse/categories/domain/value-objects/category-id';
import { Category } from '@warehouse/categories/domain/entities/category';
import { Nullable } from '@core/domain/primitives/nullable';

export interface FindByIdCategoryRepository {
  handle: (id: CategoryId) => Promise<Nullable<Category>>;
}

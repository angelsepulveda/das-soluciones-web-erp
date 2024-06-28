import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';
import { Category } from '@warehouse/categories/domain/Entities/Category';
import { Nullable } from '@core/domain/Primitives/Nullable';

export interface FindByIdCategoryRepository {
  handle: (id: CategoryId) => Promise<Nullable<Category>>;
}

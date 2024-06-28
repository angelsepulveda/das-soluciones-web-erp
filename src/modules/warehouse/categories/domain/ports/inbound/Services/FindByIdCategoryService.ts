import { Nullable } from '@core/domain/Primitives/Nullable';
import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';
import { Category } from '@warehouse/categories/domain/Entities/Category';

export interface FindByIdCategoryService {
  handle: (id: CategoryId) => Promise<Nullable<Category>>;
}

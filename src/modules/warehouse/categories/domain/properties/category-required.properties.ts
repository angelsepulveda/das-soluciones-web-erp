import { CategoryId } from '@warehouse/categories/domain/value-objects/category-id';

export interface CategoryRequiredProperties {
  id: CategoryId;
  name: string;
  status: boolean;
}

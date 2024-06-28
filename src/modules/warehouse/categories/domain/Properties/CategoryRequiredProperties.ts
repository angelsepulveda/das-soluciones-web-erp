import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';

export interface CategoryRequiredProperties {
  id: CategoryId;
  name: string;
  status: boolean;
}

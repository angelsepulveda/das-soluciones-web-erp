import { CategoryRequiredProperties } from '@warehouse/categories/domain/properties/category-required.properties';
import { CategoryOptionalProperties } from '@warehouse/categories/domain/properties/category-optional.properties';

export type CategoryProperties = Required<CategoryRequiredProperties> &
  Partial<CategoryOptionalProperties>;

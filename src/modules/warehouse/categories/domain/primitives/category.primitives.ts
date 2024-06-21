import { CategoryRequiredPrimitives } from '@warehouse/categories/domain/primitives/category-required.primitives';
import { CategoryOptionalProperties } from '@warehouse/categories/domain/properties/category-optional.properties';

export type CategoryPrimitives = Required<CategoryRequiredPrimitives> &
  Partial<CategoryOptionalProperties>;

import { CategoryRequiredPrimitives } from '@warehouse/categories/domain/Primitives/CategoryRequiredPrimitives';
import { CategoryOptionalProperties } from '@warehouse/categories/domain/Properties/CategoryOptionalProperties';

export type CategoryPrimitives = Required<CategoryRequiredPrimitives> &
  Partial<CategoryOptionalProperties>;

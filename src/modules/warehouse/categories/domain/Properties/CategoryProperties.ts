import { CategoryRequiredProperties } from '@warehouse/categories/domain/Properties/CategoryRequiredProperties';
import { CategoryOptionalProperties } from '@warehouse/categories/domain/Properties/CategoryOptionalProperties';

export type CategoryProperties = Required<CategoryRequiredProperties> &
  Partial<CategoryOptionalProperties>;

import { UpdateCategoryDto } from '@warehouse/categories/infrastructure/dtos/update-category.dto';

export class UpdateCategoryCommand {
  constructor(public readonly request: UpdateCategoryDto) {}
}

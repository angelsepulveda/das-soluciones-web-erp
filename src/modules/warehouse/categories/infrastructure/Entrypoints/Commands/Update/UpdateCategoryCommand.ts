import { UpdateCategoryDto } from '@warehouse/categories/infrastructure/Dtos/UpdateCategoryDto';

export class UpdateCategoryCommand {
  constructor(public readonly request: UpdateCategoryDto) {}
}

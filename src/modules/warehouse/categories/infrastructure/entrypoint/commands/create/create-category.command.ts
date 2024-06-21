import { CreateCategoryDto } from '@warehouse/categories/infrastructure/dtos/create-category.dto';

export class CreateCategoryCommand {
  constructor(public readonly request: CreateCategoryDto) {}
}

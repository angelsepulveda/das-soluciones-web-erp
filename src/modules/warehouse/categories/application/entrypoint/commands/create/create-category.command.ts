import { CreateCategoryDto } from '@warehouse/categories/application/dtos/create-category.dto';

export class CreateCategoryCommand {
  constructor(public readonly request: CreateCategoryDto) {}
}

import { CreateCategoryDto } from '@warehouse/categories/infrastructure/Dtos/CreateCategoryDto';

export class CreateCategoryCommand {
  constructor(public readonly request: CreateCategoryDto) {}
}

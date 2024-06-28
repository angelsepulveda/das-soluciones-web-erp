import { CreateCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/CreateCategoryService';
import { Category } from '@warehouse/categories/domain/Entities/Category';

interface Input {
  name: string;
  description?: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly createService: CreateCategoryService) {}

  async handle(input: Input): Promise<Category> {
    const category = Category.create(input.name, input.description);
    await this.createService.handle(category);

    return category;
  }
}

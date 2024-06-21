import { CreateCategoryService } from '@warehouse/categories/domain/ports/inbound/services/create-category.service';
import { Category } from '@warehouse/categories/domain/entities/category';

interface Input {
  name: string
  description?: string
}

export class CreateCategoryUsecase {
  constructor(private readonly createService: CreateCategoryService) { }

  async handle(input: Input): Promise<Category> {
    const category = Category.create(input.name, input.description);
    await this.createService.handle(category);

    return category;
  }
}

import { Category } from '@warehouse/categories/domain/Entities/Category';
import { CategoryNotFoundException } from '@warehouse/categories/domain/Exceptions/CategoryNotFoundException';
import { FindByIdCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/FindByIdCategoryService';
import { UpdateCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/UpdateCategoryService';
import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';

interface Input {
  id: string;
  name: string;
  description?: string;
}

export class UpdateCategoryUseCase {
  constructor(
    private readonly finByIdService: FindByIdCategoryService,
    private readonly updateService: UpdateCategoryService,
  ) {}

  async handle(input: Input): Promise<Category> {
    const categoryUpdated = await this.finByIdService.handle(
      new CategoryId(input.id),
    );

    if (categoryUpdated == null) throw new CategoryNotFoundException();

    categoryUpdated.updateProperties(input.name, input.description);

    await this.updateService.handle(categoryUpdated);

    return categoryUpdated;
  }
}

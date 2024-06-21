import { Category } from '@warehouse/categories/domain/entities/category';
import { CategoryNotFoundException } from '@warehouse/categories/domain/exceptions/category-not-found.exception';
import { FindByIdCategoryService } from '@warehouse/categories/domain/ports/inbound/services/find-by-id-category.service';
import { UpdateCategoryService } from '@warehouse/categories/domain/ports/inbound/services/update-category.service';
import { CategoryId } from '@warehouse/categories/domain/value-objects/category-id';

interface Input {
  id: string;
  name: string;
  description?: string;
}

export class UpdateCategoryUsecase {
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

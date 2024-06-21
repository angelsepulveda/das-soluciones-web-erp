import { CreateCategoryService } from '@warehouse/categories/domain/ports/inbound/services/create-category.service';
import { Category } from '@warehouse/categories/domain/entities/category';
import { CreateCategoryDto } from '@warehouse/categories/application/dtos/create-category.dto';
import { CategoryDto } from '@warehouse/categories/application/dtos/category.dto';

export class CreateCategoryUsecase {
  constructor(private readonly createService: CreateCategoryService) {}

  async handle(dto: CreateCategoryDto): Promise<CategoryDto> {
    const category = Category.create(dto.name, dto.description);
    await this.createService.handle(category);

    return category.toPrimitives();
  }
}

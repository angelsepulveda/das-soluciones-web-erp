import { FindAllCategoryService } from '@warehouse/categories/domain/ports/inbound/services/find-all-category.service';
import { Category } from '@warehouse/categories/domain/entities/category';

export class FindAllCategoryUseCase {
  constructor(private readonly findAllService: FindAllCategoryService) {}

  async handle(): Promise<Category[]> {
    return await this.findAllService.handle();
  }
}

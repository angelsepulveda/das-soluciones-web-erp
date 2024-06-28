import { FindAllCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/FindAllCategoryService';
import { Category } from '@warehouse/categories/domain/Entities/Category';

export class FindAllCategoryUseCase {
  constructor(private readonly findAllService: FindAllCategoryService) {}

  async handle(): Promise<Category[]> {
    return await this.findAllService.handle();
  }
}

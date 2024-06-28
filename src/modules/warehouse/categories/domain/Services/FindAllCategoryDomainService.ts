import { FindAllCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/FindAllCategoryService';
import { Category } from '@warehouse/categories/domain/Entities/Category';

export class FindAllCategoryDomainService implements FindAllCategoryService {
  constructor(private readonly repostory: FindAllCategoryService) {}

  async handle(): Promise<Category[]> {
    return await this.repostory.handle();
  }
}

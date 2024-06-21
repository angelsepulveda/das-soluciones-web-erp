import { FindAllCategoryService } from '@warehouse/categories/domain/ports/inbound/services/find-all-category.service';
import { Category } from '../entities/category';

export class FindAllCategoryDomainService implements FindAllCategoryService {
  constructor(private readonly repostory: FindAllCategoryService) {}

  async handle(): Promise<Category[]> {
    return await this.repostory.handle();
  }
}

import { FindByIdCategoryService } from '@warehouse/categories/domain/ports/inbound/services/find-by-id-category.service';
import { FindByIdCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/find-by-id-category.repository';
import { Category } from '../entities/category';
import { CategoryId } from '../value-objects/category-id';
import { Nullable } from '@core/domain/primitives/nullable';

export class FindByIdCategoryDomainService implements FindByIdCategoryService {
  constructor(private readonly repository: FindByIdCategoryRepository) {}

  async handle(id: CategoryId): Promise<Nullable<Category>> {
    return await this.repository.handle(id);
  }
}

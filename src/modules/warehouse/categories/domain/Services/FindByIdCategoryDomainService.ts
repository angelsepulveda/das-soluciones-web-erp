import { FindByIdCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/FindByIdCategoryService';
import { FindByIdCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/FindByIdCategoryRepository';
import { Category } from '@warehouse/categories/domain/Entities/Category';
import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';
import { Nullable } from '@core/domain/Primitives/Nullable';

export class FindByIdCategoryDomainService implements FindByIdCategoryService {
  constructor(private readonly repository: FindByIdCategoryRepository) {}

  async handle(id: CategoryId): Promise<Nullable<Category>> {
    return await this.repository.handle(id);
  }
}

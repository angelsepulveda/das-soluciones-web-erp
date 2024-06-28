import { UpdateCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/UpdateCategoryService';
import { Category } from '@warehouse/categories/domain/Entities/Category';
import { UpdateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/UpdateCategoryRepository';

export class UpdateCategoryDomainService implements UpdateCategoryService {
  constructor(private readonly repository: UpdateCategoryRepository) {}

  async handle(category: Category): Promise<void> {
    await this.repository.handle(category);
  }
}

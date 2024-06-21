import { UpdateCategoryService } from '@warehouse/categories/domain/ports/inbound/services/update-category.service';
import { Category } from '../entities/category';
import { UpdateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/update-category.repository';

export class UpdateCategoryDomainService implements UpdateCategoryService {
  constructor(private readonly repository: UpdateCategoryRepository) {}

  async handle(category: Category): Promise<void> {
    await this.repository.handle(category);
  }
}

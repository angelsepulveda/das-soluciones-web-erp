import { CreateCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/CreateCategoryService';
import { Category } from '@warehouse/categories/domain/Entities/Category';
import { CreateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/CreateCategoryRepository';

export class CreateCategoryDomainService implements CreateCategoryService {
  constructor(private readonly repository: CreateCategoryRepository) {}

  async handle(category: Category): Promise<void> {
    await this.repository.handle(category);
  }
}

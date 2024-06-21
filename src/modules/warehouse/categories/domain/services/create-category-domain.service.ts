import { CreateCategoryService } from '@warehouse/categories/domain/ports/inbound/services/create-category.service';
import { Category } from '../entities/category';
import { CreateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/create-category.repository';

export class CreateCategoryDomainService implements CreateCategoryService {
  constructor(private readonly repository: CreateCategoryRepository) {}

  async handle(category: Category): Promise<void> {
    await this.repository.handle(category);
  }
}

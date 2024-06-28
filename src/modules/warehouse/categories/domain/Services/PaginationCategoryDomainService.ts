import { PaginationCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/PaginationCategoryService';
import { PaginationParams } from 'src/Core/domain/Entities/PaginationParams';
import { PaginationCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/PaginationCategoryRepository';
import { PaginationResult } from '@core/domain/Entities/PaginationResult';
import { Category } from '@warehouse/categories/domain/Entities/Category';

export class PaginationCategoryDomainService
  implements PaginationCategoryService
{
  constructor(private readonly repository: PaginationCategoryRepository) {}

  async handle(params: PaginationParams): Promise<PaginationResult<Category>> {
    return await this.repository.handle(params);
  }
}

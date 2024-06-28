import { Category } from '@warehouse/categories/domain/Entities/Category';
import { PaginationCategoryService } from '@warehouse/categories/domain/ports/inbound/Services/PaginationCategoryService';
import { PaginationResultDto } from '@core/infrastructure/Dtos/PaginationResultDto';
import { PaginationParams } from '@core/domain/Entities/PaginationParams';

export class PaginationCategoryUseCase {
  constructor(private readonly paginationServie: PaginationCategoryService) {}

  async handle(
    params: PaginationParams,
  ): Promise<PaginationResultDto<Category>> {
    return await this.paginationServie.handle(params);
  }
}

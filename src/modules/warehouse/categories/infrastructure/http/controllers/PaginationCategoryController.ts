import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';
import { PaginationResultDto } from '@core/infrastructure/Dtos/PaginationResultDto';
import { CategoryPaginationDto } from '@warehouse/categories/infrastructure/Dtos/CategoryPaginationDto';
import { PaginationCategoryQuery } from '@warehouse/categories/infrastructure/Entrypoints/Queries/Pagination/PaginationCategoryQuery';

@Controller('/categories/pagination')
export class PaginationCategoryController {
  constructor(private readonly query: QueryBus) {}

  @Get()
  async handle(
    @Query() request: CategoryPaginationDto,
  ): Promise<PaginationResultDto<CategoryDto>> {
    return await this.query.execute(new PaginationCategoryQuery(request));
  }
}

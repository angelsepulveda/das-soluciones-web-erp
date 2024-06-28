import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationCategoryQuery } from '@warehouse/categories/infrastructure/Entrypoints/Queries/Pagination/PaginationCategoryQuery';
import { PaginationResultDto } from '@core/infrastructure/Dtos/PaginationResultDto';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';
import { Inject } from '@nestjs/common';
import { PAGINATION_CATEGORY_USECASE } from '@warehouse/categories/application/Config/CategoryConfig';
import { PaginationCategoryUseCase } from '@warehouse/categories/application/UseCases/PaginationCategoryUseCase';
import { PaginationParams } from '@core/domain/Entities/PaginationParams';

@QueryHandler(PaginationCategoryQuery)
export class PaginationCategoryQueryHandler
  implements
    IQueryHandler<PaginationCategoryQuery, PaginationResultDto<CategoryDto>>
{
  constructor(
    @Inject(PAGINATION_CATEGORY_USECASE)
    private readonly usecase: PaginationCategoryUseCase,
  ) {}

  async execute(
    query: PaginationCategoryQuery,
  ): Promise<PaginationResultDto<CategoryDto>> {
    const paginated = await this.usecase.handle(
      new PaginationParams(query.request.limit, query.request.offset),
    );

    return {
      currentPage: paginated.currentPage,
      totalItems: paginated.totalItems,
      totalPages: paginated.totalPages,
      itemsPerPage: paginated.itemsPerPage,
      nextPage: paginated.nextPage,
      items: paginated.items.map((item) => item.toPrimitives()),
    };
  }
}
